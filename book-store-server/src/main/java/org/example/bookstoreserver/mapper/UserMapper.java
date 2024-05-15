package org.example.bookstoreserver.mapper;

import org.example.bookstoreserver.dto.user.UserDto;
import org.example.bookstoreserver.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserDto toUserDto(User user) {
        UserDto tmp = new UserDto();
        tmp.setId(user.getId());
        tmp.setFullName(user.getFullName());
        tmp.setUsername(user.getUsername());
        tmp.setEmail(user.getEmail());
        tmp.setRoles(user.getRoles());
        tmp.setCart(user.getCart());

        return tmp;
    }
}
