package org.example.bookstoreserver.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.example.bookstoreserver.Validator;
import org.example.bookstoreserver.config.UserInfoUserDetailsService;
import org.example.bookstoreserver.dto.user.AuthenticationResponse;
import org.example.bookstoreserver.dto.user.LoginRequest;
import org.example.bookstoreserver.exception.CustomExceptionHandler;
import org.example.bookstoreserver.exception.UserException;
import org.example.bookstoreserver.model.User;
import org.example.bookstoreserver.repositories.TokenRepository;
import org.example.bookstoreserver.repositories.UserRepository;
import org.example.bookstoreserver.service.JwtService;
import org.example.bookstoreserver.service.TokenService;
import org.example.bookstoreserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private UserService userService;
    @Autowired
    private TokenRepository tokenRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    public Validator validator;
    @Autowired
    private CustomExceptionHandler customExceptionHandler;
    @Autowired
    private UserInfoUserDetailsService userInfoUserDetailsService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody @Valid User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errorMessage = validator.getErrorMessage(bindingResult);
            return ResponseEntity.badRequest().body(errorMessage);
        }
//         Kiểm tra xem username đã tồn tại hay chưa
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }
        try {
            userService.saveUser(user);

            // Trả về thông báo thành công
            return ResponseEntity.ok("User registered successfully");

        } catch (UserException ex) {
            return customExceptionHandler.handleUserException(ex);
        }

    }

    @PostMapping
    public ResponseEntity<?> checkUserExists(@RequestBody String username) {
        try {

            if (userInfoUserDetailsService.loadUserByUsername(username) != null) ;
            return ResponseEntity.ok("User is exists");
        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.ok("User not found");
        }

    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticateAndGetToken(@RequestBody @Valid LoginRequest loginRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errorMessage = validator.getErrorMessage(bindingResult);
            return ResponseEntity.badRequest().body(errorMessage);
        }
        return ResponseEntity.ok(tokenService.authenticate(loginRequest));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        final String token;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Authorization not valid");
        }
        token = authHeader.substring(7);
        if (jwtService.isTokenExpired(token)) {
            return ResponseEntity.badRequest().body("Token has already expired.");
        }
        // Thêm token vào danh sách token đã hết hạn
        jwtService.addToExpiredTokenList(token);
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logout successful.");
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        return ResponseEntity.ok(tokenService.refreshToken(request, response));
    }
}