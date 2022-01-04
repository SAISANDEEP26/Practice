package com.example.backend.controller;

import com.example.backend.model.Customer;
import com.example.backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@CrossOrigin("*")
public class CustomerController {
//    private Logger logger;
    @Autowired
    CustomerService service;
    @GetMapping(value="/test")
    public String test(){
        System.out.println("helllooooooo");
        return "hello";
    }

    @PostMapping(value= "/create")
    public Customer create(@RequestBody Customer customer) {
        return service.updateCustomer(customer);
    }
    /**
     * Method to fetch all employees from the db.
     * @return
     */
    @GetMapping(value= "/getall")
    public List<Customer> getAll() {
//        logger.info("Getting all employees.");
        return service.findAllCustomers();
    }

    /**
     * Method to fetch employee by id.
     * @param id
     * @return
     */
    @GetMapping(value= "/getbyid/{id}")
    public Optional<Customer> getById(@PathVariable(value= "id") String id) {
//        logger.info("Getting employee with employee-id= {}.", id);
        return service.findById(id);
    }

    /**
     * Method to update employee by id.
     * @param id
     * @param
     * @return
     */
    @PutMapping(value= "/update/{id}")
    public String update(@PathVariable(value= "id") String id, @RequestBody Customer customer) {
//        logger.info("Updating employee with employee-id= {}.", id);
        customer.setId(id);
        service.updateCustomer(customer);
        return "Employee record for employee-id= " + id + " updated.";
    }

    /**
     * Method to delete employee by id.
     * @param id
     * @return
     */
    @DeleteMapping(value= "/delete/{id}")
    public String delete(@PathVariable(value= "id") String id) {
//        logger.info("Deleting employee with employee-id= {}.", id);
        service.deleteCustomer(id);
        return "Employee record for employee-id= " + id + " deleted.";
    }

    /**
     * Method to delete all employees from the db.
     * @return
     */
    @DeleteMapping(value= "/deleteall")
    public String deleteAll() {
//        logger.debug("Deleting all employees.");
        service.deleteAllCustomers();
        return "All employee records deleted.";
    }
}
