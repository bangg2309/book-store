package org.example.bookstoreserver.repositories;

import org.example.bookstoreserver.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
}