package com.example.spacecourses.Entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.Date;

@Component
@Entity
@Getter
@Setter
@ToString
@Table( name = "Search")
public class Search {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String keyword;
    private Date AtDate;



}
