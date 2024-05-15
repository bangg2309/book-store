package org.example.bookstoreserver.service;

import jakarta.servlet.http.HttpServletRequest;
import org.example.bookstoreserver.dto.user.UserDto;
import org.example.bookstoreserver.exception.NotFoundException;
import org.example.bookstoreserver.mapper.UserMapper;
import org.example.bookstoreserver.model.User;
import org.example.bookstoreserver.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private JwtService jwtService;
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }


    public List<UserDto> getAllUser() {
        return userRepository.findAll().stream().map(this.userMapper::toUserDto).toList();
    }


    public UserDto getUserById(Long id) {
        User user = this.userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not isExist in Database"));
        return userMapper.toUserDto(user);
    }

    public void updateUser(Long userId, UserDto updateUser) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            // Cập nhật các thuộc tính của người dùng hiện có với đối tượng updatedUser
            BeanUtils.copyProperties(updateUser, user, "id"); // Loại bỏ việc sao chép trường 'id'
            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("Không tìm thấy người dùng với ID: " + userId);
        }
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }


    public UserDto getUserByToken(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        final String token;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);
        User user = userRepository.findByUsername(username).orElseThrow();
        return this.userMapper.toUserDto(user);
    }
}
