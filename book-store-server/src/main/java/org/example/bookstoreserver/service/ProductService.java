package org.example.bookstoreserver.service;

import org.example.bookstoreserver.exception.ProductException;
import org.example.bookstoreserver.model.Product;
import org.example.bookstoreserver.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Page<Product> getAllProduct(Pageable pageable) {
        try {
            return productRepository.findAll(pageable);
        } catch (ProductException ex) {
            throw new ProductException("Get all product failed");
        }

    }

    public List<Product> getBestSeller() {
        try {
            return productRepository.findTop10ByOrderBySalesDesc();
        } catch (ProductException ex) {
            throw new ProductException("Get best seller failed");
        }

    }

    public List<Product> getNewArrivals() {
        try {
            return productRepository.findTop10ByOrderByCreatedAtDesc();
        } catch (ProductException ex) {
            throw new ProductException("Get new arrivals failed");
        }

    }
}
