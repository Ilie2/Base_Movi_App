package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User,Integer> {
    boolean findByUsername(String username);

    User findByUsernameAndPassword(String username, String password);
}
