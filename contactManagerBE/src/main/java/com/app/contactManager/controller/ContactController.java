package com.app.contactManager.controller;

import com.app.contactManager.dto.ContactAddEditDto;
import com.app.contactManager.dto.ContactDto;
import com.app.contactManager.dto.GetContactsOfUserDTO;
import com.app.contactManager.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/contacts")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {
    @Autowired
    private ContactService contactService;


    @PostMapping("/add-contact")
    public ContactDto addContact(@RequestBody ContactAddEditDto contactAddEditDto) {
        return contactService.addContact(contactAddEditDto);
    }

    @GetMapping("/all")
    public List<ContactDto> getAllContacts() {
        return contactService.getAllContacts();
    }

    @PutMapping("/edit-contact/{contactId}")
    public ContactDto editContact(@PathVariable Integer contactId, @RequestBody ContactAddEditDto contactAddEditDto) {
        return contactService.editContact(contactId, contactAddEditDto);
    }

    @DeleteMapping("/delete-contact/{contactId}")
    public String deleteContact(@PathVariable Integer contactId){
        return contactService.deleteContact(contactId);
    }

    @GetMapping("/search")
    public List<ContactDto> searchContacts(@RequestParam Integer userId,@RequestParam String keyword) {
        return contactService.searchContacts(userId,keyword);
    }

    @PostMapping("/import-csv")
    public String importCsv(@RequestParam("file") MultipartFile file, @RequestParam("userId") Integer userId) {
        return contactService.importCsv(file, userId);
    }

    @GetMapping("/{userId}")
    public List<GetContactsOfUserDTO> getContactsByUserId(@PathVariable Long userId) {
        return contactService.getContactsByUserId(userId);
    }

}
