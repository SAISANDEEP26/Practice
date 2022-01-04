package com.example.backend.service;

import com.example.backend.model.Customer;
import com.example.backend.repo.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepo repo;

    public List<Customer> findAllCustomers(){
        return repo.findAll();
    }

    public Optional<Customer> findById(String id){
        return repo.findById(id);
    }

    public Customer updateCustomer(Customer customer){
        return repo.save(customer);
    }

    public void deleteCustomer(String id){
         repo.deleteById(id);
    }

    public void deleteAllCustomers(){
        repo.deleteAll();
    }


}
