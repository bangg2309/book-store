package org.example.bookstoreserver.repositories;

import org.example.bookstoreserver.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token, Integer> {
    Token findByRefreshToken(String refreshToken);
}