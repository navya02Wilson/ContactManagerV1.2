package com.app.contactManager.controller;

import com.app.contactManager.dto.*;
import com.app.contactManager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String registerUser(@RequestBody UserRegistrationDTO dto) {
        return userService.registerUser(dto);
    }

//    @PostMapping("/login")
//    public LoginResponseDTO loginUser(@RequestBody Map<String, String> credentials) {
//        String email = credentials.get("email");
//        String password = credentials.get("password");
//        return userService.loginUser(email, password);
//    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDto loginDto) {
        String token = userService.login(loginDto);
        return ResponseEntity.ok(token);
    }

    @GetMapping("/get-by-id/{userId}")
    public UserDto getUserId(@PathVariable Integer userId){
        return userService.getUserId(userId);
    }
}
