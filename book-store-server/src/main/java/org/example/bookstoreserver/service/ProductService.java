package org.example.bookstoreserver.service;

import org.example.bookstoreserver.dto.ProductRequest;
import org.example.bookstoreserver.exception.NotFoundException;
import org.example.bookstoreserver.exception.ProductException;
import org.example.bookstoreserver.model.Author;
import org.example.bookstoreserver.model.Category;
import org.example.bookstoreserver.model.Product;
import org.example.bookstoreserver.model.Publisher;
import org.example.bookstoreserver.repositories.AuthorRepository;
import org.example.bookstoreserver.repositories.CategoryRepository;
import org.example.bookstoreserver.repositories.ProductRepository;
import org.example.bookstoreserver.repositories.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private AuthorRepository authorRepository;
    @Autowired
    private PublisherRepository publisherRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    private Product getProduct(ProductRequest productRequest, Product product) {
        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setImage(productRequest.getImage());
        product.setQuantity(productRequest.getQuantity());

        Category category = categoryRepository.findById(productRequest.getCategoryId())
                .orElseThrow(() -> new NotFoundException("Category not found with ID: " + productRequest.getCategoryId()));
        Publisher publisher = publisherRepository.findByName(productRequest.getPublisher());
        Author author = authorRepository.findByName(productRequest.getAuthor());
        if(author == null ){
            Author author1 = new Author();
            author1.setName(productRequest.getAuthor());
            authorRepository.save(author1);
            product.setAuthor(author1);

        }else{
            product.setAuthor(author);
        }
        if(publisher == null){
            Publisher newPublisher = new Publisher();
            newPublisher.setName(productRequest.getPublisher());
            publisherRepository.save(newPublisher);
            product.setPublisher(newPublisher);
        }else{
            product.setPublisher(publisher);
        }
        product.setCategory(category);


        return productRepository.save(product);
    }

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
    //tim kiem
    public List<Product> search(String name) {
        try {
            return productRepository.findByNameContaining(name);
        }catch (ProductException ex){
            throw new NotFoundException("not found products with key: " + name);
        }
    }
    public void deleteProductById(Long productId) {
        try{
            Product product = productRepository.findById(productId).orElseThrow(() -> new NotFoundException("Product not exists in database"));
            productRepository.deleteById(product.getId());
        }catch (ProductException ex){
            throw new ProductException("Delete product failed");
        }


    }
    //cap nhat san pham
    public Product updateProduct(Long id, ProductRequest productRequest) {
        try {
            Product product = productRepository.findById(id).orElseThrow(() -> new NotFoundException("Product not exists in database"));
            return getProduct(productRequest, product);
        }catch (ProductException ex){
            throw new ProductException("Update product failed");
        }

    }
}
