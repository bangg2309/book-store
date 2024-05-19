package org.example.bookstoreserver.service;

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

    public void addToCart(Long userId, Long productId, Integer quantity) {
        // 4. Lấy thông tin sản phẩm theo productId
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product not found"));
        // 5. Lấy thông tin người dùng theo userId
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
        // 6. Lấy giỏ hàng của người dùng nếu có, nếu không tạo mới
        Cart cart = user.getCart();
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            cartRepository.save(cart);
            cart.setId(cart.getId());
            user.setCart(cart);
            userRepository.save(user);
        }
        // 7. Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        CartItem cartItem = cart.getCartItemByProductId(productId);
        // 8. Nếu chưa có thì tạo mới CartItem
        if (cartItem == null) {
            cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);

            // 9. Thêm CartItem vào giỏ hàng
            cart.addCartItem(cartItem);
        } else {
            // 9. Nếu đã có thì cập nhật số lượng
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        }
        // 10. Lưu thông tin CartItem xuống database
        cartItemRepository.save(cartItem);
        // 11. Lưu thông tin giỏ hàng xuống database
        cartRepository.save(cart);
    }
}
