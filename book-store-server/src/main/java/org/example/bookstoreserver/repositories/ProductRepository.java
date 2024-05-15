package org.example.bookstoreserver.repositories;

import org.example.bookstoreserver.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {
    void deleteById(Long id);

    List<Product> findByNameContaining(String name);

    List<Product> findAll(Specification<Product> spec);

    Product save(Product product);

    Optional<Product> findById(Long productId);

    List<Product> findAll();

    Page<Product> findAll(Pageable pageable);

    List<Product> findTop10ByOrderBySalesDesc();

    List<Product> findTop10ByOrderByCreatedAtDesc();
}