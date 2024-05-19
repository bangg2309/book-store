package org.example.bookstoreserver.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.example.bookstoreserver.Validator;
import org.example.bookstoreserver.dto.cart.CartRequest;
import org.example.bookstoreserver.exception.CustomExceptionHandler;
import org.example.bookstoreserver.exception.NotFoundException;
import org.example.bookstoreserver.model.User;
import org.example.bookstoreserver.repositories.UserRepository;
import org.example.bookstoreserver.service.CartService;
import org.example.bookstoreserver.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/carts")
public class CartController {
    @Autowired
    public JwtService jwtService;
    @Autowired
    public UserRepository userRepository;
    @Autowired
    private Validator validator;
    @Autowired
    private CustomExceptionHandler customExceptionHandler;
    @Autowired
    public AuthenticationManager authenticationManager;
    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping()
    public ResponseEntity<?> addToCart(HttpServletRequest request, HttpServletResponse response, @RequestBody @Valid CartRequest cartRequest) {

        final String token;
        final String authHeader = request.getHeader("Authorization");
        //2. Kiểm tra xem người dùng đã đăng nhập chưa
        if (!isLogin(request)) {
            // 3. Nếu chưa đăng nhập thì trả về lỗi "Authorization not valid" với status code 400
            return ResponseEntity.badRequest().body("Authorization not valid");
        }
        token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NotFoundException("User not found"));
        Long userId = user.getId();
        Long productId = cartRequest.getProductId();
        int quantity = cartRequest.getQuantity();
        // 3. Gọi phương thức addToCart của CartService để thêm sản phẩm vào giỏ hàng
        cartService.addToCart(userId, productId, quantity);

        //12. Trả về thông báo "Add to cart successfully" với status code 200
        return ResponseEntity.ok("Add to cart successfully");
    }

    public boolean isLogin(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        return authHeader != null && authHeader.startsWith("Bearer ");
    }
}
