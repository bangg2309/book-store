package org.example.bookstoreserver.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


public class LoginRequest {

    @NotBlank(message = "Username should´t be null or empty")
    private String username;
    @NotBlank(message = "Password should´t be null or empty")
    @Size(min = 4, max = 8)
    private String password;

    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public LoginRequest() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}