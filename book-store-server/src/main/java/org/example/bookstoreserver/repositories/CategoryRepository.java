package org.example.bookstoreserver.repositories;

import org.example.bookstoreserver.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}