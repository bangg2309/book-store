package org.example.bookstoreserver.repositories;

import org.example.bookstoreserver.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Long> {
    static Author findByName(String authorName);
}