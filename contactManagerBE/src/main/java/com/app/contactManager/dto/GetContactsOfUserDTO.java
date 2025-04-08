package com.app.contactManager.dto;

public class GetContactsOfUserDTO {
    private Integer id;
//    private String name;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String address;

    public GetContactsOfUserDTO() {
    }

    public GetContactsOfUserDTO(Integer id, String firstName, String lastName, String phone, String email, String address) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.address = address;
    }

//    public GetContactsOfUserDTO(Integer id, String name, String phone, String email, String address) {
//        this.id = id;
//        this.name = name;
//        this.phone = phone;
//        this.email = email;
//        this.address = address;
//    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
