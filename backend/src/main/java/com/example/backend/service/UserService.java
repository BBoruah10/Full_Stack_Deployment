package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepo repo;


    public List<User> getUser() {
        return repo.findAll();
    }


    public User getUserOne(int id) {
        return repo.findById(id).orElse(null);
    }

    public void addUser(User u) {
        repo.save(u);
    }

    public void deleteUser(int id) {
        repo.deleteById(id);
    }

    public User updateUser(int id,User n) {

        User u=getUserOne(id);
        if (u != null) {
            u.setEmail(n.getEmail());
            u.setName(n.getName());
            u.setPassword(n.getPassword());

            return repo.save(u);
        }

        return null;
    }
}
