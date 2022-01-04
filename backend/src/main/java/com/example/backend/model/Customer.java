package com.example.backend.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "customer")

public class Customer {
    @Id
    @Setter
    @Getter
    private String id;
    @Setter
    @Getter
    String name;
//    @Size(min=0,max=10)
//    @Pattern(regexp="(^$|[0-9]{10})")
@Setter
@Getter
    String  phoneNumber;
    @Setter
    @Getter
    String email;
    @Setter
    @Getter
    String address;
}
