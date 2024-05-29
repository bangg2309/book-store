package org.example.bookstoreserver.controller;

import jakarta.validation.Valid;
import org.example.bookstoreserver.Validator;
import org.example.bookstoreserver.dto.ProductRequest;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
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
    //    với điều kiện role là admin
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> createProduct (@RequestBody @Valid ProductRequest productRequest, BindingResult bindingResult){
//        Kiểm tra xem có lỗi không
        if(bindingResult.hasErrors()){
            List<String> errorMessage = validator.getErrorMessage(bindingResult);
//            Trả về lỗi
            return ResponseEntity.badRequest().body(errorMessage);
        }
        try {
//            nếu không có lỗi thì gọi hàm saveProduct lưu sản phẩm (thêm sản phẩm)
            productService.saveProduct(productRequest);
            return ResponseEntity.ok("Successfully");
        }catch (ProductException ex){
            return customExceptionHandler.handleProductException(ex);
        }catch (NotFoundException ex){
            return customExceptionHandler.handleNotFoundException(ex);
        }

    }
    //    Lấy sản phẩm theo id với điều kiện role là admin
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> deleteProductById(@PathVariable Long id){
        try {
//            gọi hàm xóa sản phẩm theo id
//            nếu không tìm thấy sản phẩm thì ném ra ngoại lệ NotFoundException
            productService.deleteProductById(id);
            return ResponseEntity.ok("Delete product successfully");
        }catch (ProductException ex){
            return customExceptionHandler.handleProductException(ex);
        }catch (NotFoundException ex){
            return customExceptionHandler.handleNotFoundException(ex);
        }

    }
//    Lấy sản phẩm theo id với điều kiện role là admin
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> updateProductById(@PathVariable Long id, @RequestBody @Valid ProductRequest productRequest, BindingResult bindingResult) {
//        Kiểm tra xem có lỗi không
        if(bindingResult.hasErrors()){
            List<String> errorMessage = validator.getErrorMessage(bindingResult);
            return ResponseEntity.badRequest().body(errorMessage);
        }

        try {
//            gọi hàm update sản phẩm theo id
//            nếu không tìm thấy sản phẩm thì ném ra ngoại lệ NotFoundException
            productService.updateProduct(id, productRequest);
            return ResponseEntity.ok("Update product successfully");
        } catch (NotFoundException e) {
            return customExceptionHandler.handleNotFoundException(e);
        }catch (ProductException ex){
            return customExceptionHandler.handleProductException(ex);
        }
    }
}
