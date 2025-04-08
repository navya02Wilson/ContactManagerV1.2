package com.app.contactManager.dto;

public class AuthResponseDto {
    private String message;
    private String name;
    private String email;

    public AuthResponseDto() {
    }

    public AuthResponseDto(String message, String name, String email) {
        this.message = message;
        this.name = name;
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
