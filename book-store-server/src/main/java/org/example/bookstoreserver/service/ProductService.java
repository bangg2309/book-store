package org.example.bookstoreserver.service;

import org.example.bookstoreserver.dto.ProductRequest;
import org.example.bookstoreserver.exception.NotFoundException;
import org.example.bookstoreserver.exception.ProductException;
import org.example.bookstoreserver.exception.ResourceNotFoundProduct;
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

import java.util.Date;
import java.util.List;
import java.util.Optional;

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

    // Phương thức để cập nhật hoặc tạo một sản phẩm sử dụng dữ liệu từ ProductRequest và Product hiện có
    private Product getProduct(ProductRequest productRequest, Product product) {
        // Đặt thuộc tính của sản phẩm bằng giá trị từ productRequest
        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setImage(productRequest.getImage());
        product.setQuantity(productRequest.getQuantity());
        // Tìm danh mục bằng ID từ productRequest, nếu không tìm thấy thì ném ra ngoại lệ NotFoundException
        Category category = categoryRepository.findById(productRequest.getCategoryId())
                .orElseThrow(() -> new NotFoundException("Category not found with ID: " + productRequest.getCategoryId()));
        // Tìm nhà xuất bản bằng tên từ productRequest
        Publisher publisher = publisherRepository.findByName(productRequest.getPublisher());
        // Tìm tác giả bằng tên từ productRequest
        Author author = authorRepository.findByName(productRequest.getAuthor());
        // Nếu tác giả không tồn tại, tạo mới và lưu vào cơ sở dữ liệu, sau đó gán vào sản phẩm
        if (author == null) {
            Author author1 = new Author();
            author1.setName(productRequest.getAuthor());
            authorRepository.save(author1);
            product.setAuthor(author1);
        } else {
            // Nếu tác giả tồn tại, gán vào sản phẩm
            product.setAuthor(author);
        }
        // Nếu nhà xuất bản không tồn tại, tạo mới và lưu vào cơ sở dữ liệu, sau đó gán vào sản phẩm
        if (publisher == null) {
            Publisher newPublisher = new Publisher();
            newPublisher.setName(productRequest.getPublisher());
            publisherRepository.save(newPublisher);
            product.setPublisher(newPublisher);
        } else {
            // Nếu nhà xuất bản tồn tại, gán vào sản phẩm
            product.setPublisher(publisher);
        }

        // Gán danh mục vào sản phẩm
        product.setCategory(category);
        // Lưu sản phẩm vào cơ sở dữ liệu và trả về sản phẩm đã lưu
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
//            tìm sản phẩm theo id, nếu không tìm thấy thì ném ra ngoại lệ NotFoundException
//            nếu tìm thấy xóa sản phẩm đó khỏi database
            Product product = productRepository.findById(productId).orElseThrow(() -> new NotFoundException("Product not exists in database"));
            productRepository.deleteById(product.getId());
        }catch (ProductException ex){
            throw new ProductException("Delete product failed");
        }


    }
    //cap nhat san pham
    public Product updateProduct(Long id, ProductRequest productRequest) {
        try {
//            tìm sản phẩm theo id, nếu không tìm thấy thì ném ra ngoại lệ NotFoundException
            Product product = productRepository.findById(id).orElseThrow(() -> new NotFoundException("Product not exists in database"));
//            nếu tìm thấy thì gọi hàm getProduct để cập nhật thông tin sản phẩm
            return getProduct(productRequest, product);
        }catch (ProductException ex){
            throw new ProductException("Update product failed");
        }

    }
    public Product saveProduct(ProductRequest productRequest) {
        try {
//            tạo mới một sản phẩm bao gồm các thông tin cơ bản như sales = 0, createAt = currentDate
            Product product = new Product();
            product.setSales(0);
            Date currentDate = new Date();
            product.setCreateAt(currentDate);
//            gọi hàm getProduct để lấy thông tin sản phẩm từ request và lưu vào database
            return getProduct(productRequest, product);
        }catch (ProductException ex){
            throw new ProductException("Save product failed");
        }

    }

    // product detail
    public Optional<Product> findProductById(Long productId) {
        try {
            return productRepository.findById(productId);
        } catch (Exception e) {
            throw new ResourceNotFoundProduct ("Product not found: " + productId);
        }
    }
}
