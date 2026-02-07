package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {
    @Autowired
    private UserService service;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers(){
        List<User> u=service.getUser();
        return new ResponseEntity<>(u, HttpStatus.OK);
    }
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id){
        User u=service.getUserOne(id);
        return new ResponseEntity<>(u,HttpStatus.OK);
    }
    @PostMapping("/users")
    public ResponseEntity<String> addUser(@RequestBody User u){
        service.addUser(u);
        return new ResponseEntity<>("Added",HttpStatus.CREATED);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id){
        service.deleteUser(id);
        return new ResponseEntity<>("Deleted!",HttpStatus.OK);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id,@RequestBody User n){
        User u=service.updateUser(id,n);
        return new ResponseEntity<>(u,HttpStatus.OK);
    }
}
