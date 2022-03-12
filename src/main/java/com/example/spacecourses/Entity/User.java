package com.example.spacecourses.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table( name = "User")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotNull
    @Size(min=2, max=10)
    private String nom;

    @NotNull
    @Size(min=2, max=10)
    private String prenom;

    @NotNull
    @Size(min = 8 ,max = 8)
    private Integer telephone;
    @NotNull
    @Email(message = "Email should be valid")
    private String email;

    @Min(value = 18, message = "Age should not be less than 18")
    @Max(value = 150, message = "Age should not be greater than 150")
    private int age;

    @Positive
    private Integer tarifHoraire;
    private Role role;


    @OneToMany(mappedBy = "formateur")
    @JsonIgnore
    private Set<Formation> formationF;


    @ManyToMany(mappedBy = "apprenant")
    @JsonIgnore
    private Set<Formation> formationA;


    @OneToMany(mappedBy = "sUser",cascade = CascadeType.ALL)
    @JsonIgnore
   private Set<Result> results;

}
