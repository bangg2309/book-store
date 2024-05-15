package org.example.bookstoreserver.repositories;

import org.example.bookstoreserver.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}