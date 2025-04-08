package com.app.contactManager.service;

import com.app.contactManager.dto.*;
import com.app.contactManager.exceptions.InvalidCredentialsException;
import com.app.contactManager.models.User;
import com.app.contactManager.repo.UserRepo;
import com.app.contactManager.utils.JwtUtil;
import com.app.contactManager.utils.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtUtil jwtUtil;

//    public String registerUser(UserRegisterDto userRegisterDto) {
//        if (userRepo.existsByEmail(userRegisterDto.getEmail())) {
//            return "Email already registered!";
//        }
//
//        if (!userRegisterDto.getPassword().equals(userRegisterDto.getConfirmPassword())) {
//            return "Passwords do not match!";
//        }
//
//        User user = new User();
//        user.setName(userRegisterDto.getName());
//        user.setEmail(userRegisterDto.getEmail());
//        user.setPassword(userRegisterDto.getPassword());
//
//        userRepo.save(user);
//        return "User registered successfully!";
//    }

    public String registerUser(UserRegistrationDTO registrationDTO) {
        User user = new User();
        user.setName(registrationDTO.getName());
        user.setEmail(registrationDTO.getEmail());
        user.setPassword(PasswordUtil.hashPassword(registrationDTO.getPassword()));  // Hashing the password

        userRepo.save(user);
        return "User registered successfully!";
    }

    public Optional<User> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

//    public LoginResponseDTO loginUser(String email, String password) {
//        Optional<User> user = userRepo.findByEmailAndPassword(email, password);
//        return user.map(value -> new LoginResponseDTO(value.getId(), true))
//                .orElse(new LoginResponseDTO(null, false));
//    }
public String login(UserLoginDto loginDTO) {
    User user = findByEmail(loginDTO.getEmail())
            .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password!"));

    if (!PasswordUtil.verifyPassword(loginDTO.getPassword(), user.getPassword())) {
        throw new InvalidCredentialsException("Invalid email or password!");
    }

    return jwtUtil.generateToken(user.getEmail(), user.getId());
}


    public UserDto getUserId(Integer userId) {
        User user=userRepo.findById(userId).orElseThrow(()->new RuntimeException("User not found"));
        UserDto userDto=new UserDto();
        userDto.setUserId(user.getId());
        return userDto;
    }
}
