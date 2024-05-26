package org.example.bookstoreserver.service;

import org.example.bookstoreserver.model.Category;
import org.example.bookstoreserver.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }
}
