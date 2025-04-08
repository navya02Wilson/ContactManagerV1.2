package com.app.contactManager.service;

import com.app.contactManager.dto.ContactAddEditDto;
import com.app.contactManager.dto.ContactDto;
import com.app.contactManager.dto.GetContactsOfUserDTO;
import com.app.contactManager.models.Contact;
import com.app.contactManager.models.User;
import com.app.contactManager.repo.ContactRepo;
import com.app.contactManager.repo.UserRepo;
import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;
import com.opencsv.exceptions.CsvException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContactService {
    @Autowired
    private ContactRepo contactRepo;

    @Autowired
    private UserRepo userRepo;

    public ContactDto addContact(ContactAddEditDto contactAddEditDto) {
        Contact contact = new Contact();

        User user = userRepo.findById(contactAddEditDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        contact.setUser(user);
        contact.setFirstName(contactAddEditDto.getFirstName());
        contact.setLastName(contactAddEditDto.getLastName());
        contact.setEmail(contactAddEditDto.getEmail());
        contact.setPhone(contactAddEditDto.getPhone());
        contact.setAddress(contactAddEditDto.getAddress());

        return convertToDto(contactRepo.save(contact));
    }

    public ContactDto editContact(Integer contactId, ContactAddEditDto contactAddEditDto) {
        Contact updatedContact = contactRepo.findById(contactId)
                .orElseThrow(() -> new RuntimeException("Contact not found"));

        updatedContact.setFirstName(contactAddEditDto.getFirstName());
        updatedContact.setLastName(contactAddEditDto.getLastName());
        updatedContact.setEmail(contactAddEditDto.getEmail());
        updatedContact.setPhone(contactAddEditDto.getPhone());
        updatedContact.setAddress(contactAddEditDto.getAddress());

        return convertToDto(contactRepo.save(updatedContact));
    }

    public List<ContactDto> getAllContacts() {
        List<Contact> contacts = contactRepo.findAll();

        return contacts.stream()
                .map(this::convertToDto).toList();
    }

    public String deleteContact(Integer contactId){
        Contact contactToBeDeleted=contactRepo.findById(contactId)
                .orElseThrow(()->new RuntimeException("Contact not found"));
        contactRepo.deleteById(contactId);

        return "Contact deleted successfully";
    }


    private ContactDto convertToDto(Contact contact) {
        return new ContactDto(
                contact.getId(),
                contact.getFirstName(),
                contact.getLastName(),
                contact.getEmail(),
                contact.getPhone(),
                contact.getAddress()
        );
    }

    public String importCsv(MultipartFile file,Integer userId) {
        if (file.isEmpty()) {
            return "File is empty!";
        }

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
             CSVReader csvReader = new CSVReader(reader)) {

            List<String[]> records = csvReader.readAll();
            List<Contact> contacts = new ArrayList<>();

            for (int i = 1; i < records.size(); i++) {
                String[] data = records.get(i);

                Contact contact = new Contact();
                contact.setFirstName(data[0]);
                contact.setLastName(data[1]);
                contact.setEmail(data[2]);
                contact.setPhone(data[3]);
                contact.setAddress(data[4]);

                User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
                contact.setUser(user);

                contacts.add(contact);
            }

            contactRepo.saveAll(contacts);
            return "CSV imported successfully!";

        } catch (IOException | CsvException e) {
            e.printStackTrace();
            return "Error processing CSV file: " + e.getMessage();
        }
    }

    public List<GetContactsOfUserDTO> getContactsByUserId(Long userId) {
        List<Contact> contacts = contactRepo.findByUserId(userId);
        return contacts.stream()
                .map(contact -> new GetContactsOfUserDTO(
                        contact.getId(),
                        contact.getFirstName(),
                        contact.getLastName(),
                        contact.getPhone(),
                        contact.getEmail(),
                        contact.getAddress()
                ))
                .collect(Collectors.toList());
    }

    public List<ContactDto> searchContacts(Integer userId,String keyword) {
        List<Contact> contacts = contactRepo.searchContactsByUserId(userId,keyword);
        return contacts.stream().map(this::convertToDto).toList();
    }
}
