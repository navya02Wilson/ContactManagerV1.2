package com.app.contactManager.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "jgkhkh^$%^#%^&(&)&%^&$$VVFGFbhgfhdgfdkjfkdh@$#*&(^&%^$%#$#";
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 10;

    public String generateToken(String username, Integer userId) {
        return Jwts.builder()
                .setSubject(username)
                .claim("userId", userId)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY.getBytes())
                .compact();
    }


    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    public boolean validateToken(String token, String email) {
        try {
            String extractedEmail = extractEmail(token);
            return (email.equals(extractedEmail) && !isTokenExpired(token));
        } catch (Exception e) {
            return false;
        }
    }

    // Simple validation by only checking expiration
//    public boolean isTokenValid(String token) {
//        try {
//            return !isTokenExpired(token);
//        } catch (Exception e) {
//            return false;
//        }
//    }

    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}