package com.app.contactManager.dto;

public class LoginResponseDTO {
    private Integer userId;
    boolean success;

    public LoginResponseDTO(Integer userId, boolean success) {
        this.userId = userId;
        this.success = success;
    }

    public LoginResponseDTO() {
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
