package com.app.contactManager.repo;

import com.app.contactManager.models.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepo extends JpaRepository<Contact, Integer> {
    @Query("SELECT c FROM Contact c WHERE c.user.id = :userId AND (" +
            "LOWER(c.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(c.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR c.phone LIKE CONCAT('%', :keyword, '%'))")
    List<Contact> searchContactsByUserId(@Param("userId") Integer userId, @Param("keyword") String keyword);
    List<Contact> findByUserId(Long userId);

}
