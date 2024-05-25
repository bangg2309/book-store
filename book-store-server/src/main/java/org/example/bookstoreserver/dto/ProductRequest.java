package org.example.bookstoreserver.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ProductRequest {

    @NotBlank(message = "Product name should´t be null or empty")
    private String name;
    @NotBlank(message = "Description should´t be null or empty")
    private String description;
    @NotNull(message = "Price should´t be null or empty")
    private Double price;
    @NotBlank(message = "Image should´t be null or empty")
    private String image;
    @NotNull(message = "Quantity should´t be null or empty")
    private Integer quantity;
    @NotNull(message = "Category should´t be null or empty")
    private Long categoryId;
    @NotBlank(message = "Publisher should´t be null or empty")
    private String publisher;
    @NotBlank(message = "Author should´t be null or empty")
    private String author;



    public ProductRequest() {
    }



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
