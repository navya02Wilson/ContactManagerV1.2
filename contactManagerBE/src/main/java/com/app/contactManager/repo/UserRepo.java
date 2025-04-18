package com.app.contactManager.repo;

import com.app.contactManager.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User,Integer> {
    Optional<User> findByEmailAndPassword(String email, String password);
    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
}
