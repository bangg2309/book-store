package org.example.bookstoreserver.controller;

import org.example.bookstoreserver.Validator;
import org.example.bookstoreserver.exception.CustomExceptionHandler;
import org.example.bookstoreserver.exception.NotFoundException;
import org.example.bookstoreserver.exception.ProductException;
import org.example.bookstoreserver.model.Product;
import org.example.bookstoreserver.repositories.PublisherRepository;
import org.example.bookstoreserver.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private Validator validator;
    @Autowired
    private CustomExceptionHandler customExceptionHandler;
    @Autowired
    public PublisherRepository publisherRepository;

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<?> getAllProduct(@RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Product> product = productService.getAllProduct(pageable);
            return ResponseEntity.ok(product);
        } catch (ProductException ex) {
            return customExceptionHandler.handleProductException(ex);
        }
    }

    @GetMapping("/new-arrivals")
    public ResponseEntity<List<Product>> getNewArrivals() {
        return ResponseEntity.ok(productService.getNewArrivals());
    }

    @GetMapping("/bestsellers")
    public ResponseEntity<List<Product>> getBestsellers() {
        return ResponseEntity.ok(productService.getBestSeller());
    }

    //Search....
    @GetMapping("/search")
    public ResponseEntity<?> searchProductsByName(@RequestParam("name") String name) {
        try{
            return ResponseEntity.ok(productService.search(name));
        }catch (NotFoundException ex){
            return customExceptionHandler.handleNotFoundException(ex);
        }
    }
}
