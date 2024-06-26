package org.example.bookstoreserver.service;

import jakarta.servlet.http.HttpServletRequest;
import org.example.bookstoreserver.dto.cart.CartDto;
import org.example.bookstoreserver.dto.cart.CartItemDto;
import org.example.bookstoreserver.exception.NotFoundException;
import org.example.bookstoreserver.model.Cart;
import org.example.bookstoreserver.model.CartItem;
import org.example.bookstoreserver.model.Product;
import org.example.bookstoreserver.model.User;
import org.example.bookstoreserver.repositories.CartItemRepository;
import org.example.bookstoreserver.repositories.CartRepository;
import org.example.bookstoreserver.repositories.ProductRepository;
import org.example.bookstoreserver.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    public JwtService jwtService;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    public CartDto getCartByUserId(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        final String token;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NotFoundException("User not found"));
        Cart cart = user.getCart();
        if (cart == null) {
            return null;
        } else {
            List<CartItemDto> cartItems = new ArrayList<>();
            double totalCost = 0;
            for (CartItem c : cart.getCartItems()) {
                CartItemDto cartItemDto = new CartItemDto(c);
                totalCost += cartItemDto.getQuantity() * c.getProduct().getPrice();
                cartItems.add(cartItemDto);
            }
            CartDto cartDto = new CartDto();
            cartDto.setTotalCost(totalCost);
            cartDto.setCartItems(cartItems);
            return cartDto;
        }
    }

    public void addToCart(Long userId, Long productId, Integer quantity) {
        //12.6.5 Lấy thông tin sản phẩm theo productId từ database
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product not found"));
        // 12.6.6 Lấy thông tin người dùng theo userId từ database
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
        // 12.6.7 Lấy thông tin giỏ hàng của người dùng, nếu chưa có thì tạo mới
        Cart cart = user.getCart();
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            cartRepository.save(cart);
            cart.setId(cart.getId());
            user.setCart(cart);
            userRepository.save(user);
        }
        // 12.6.8 Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        CartItem cartItem = cart.getCartItemByProductId(productId);
        // 12.6.9 Nếu chưa có thì tạo mới CartItem
        if (cartItem == null) {
            cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);

            // 12.6.10 Thêm CartItem vào giỏ hàng
            cart.addCartItem(cartItem);
        } else {
            // 12.6.17 Nếu đã có thì cập nhật số lượng sản phẩm
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        }
        // 12.6.11 Lưu thông tin CartItem xuống database
        cartItemRepository.save(cartItem);
        // 12.6.12 Lưu thông tin giỏ hàng xuống database
        cartRepository.save(cart);
    }
}
