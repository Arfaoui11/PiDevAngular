package com.example.spacecourses.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table( name = "Quiz")
public class Quiz {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer idQuiz;
    private String title;
    private Integer score;
    @Temporal (TemporalType.DATE)
    private Date createAt;
    private String content ;

    @ManyToOne
    @JsonIgnore
    private Formation formation;

    @OneToMany(mappedBy = "quiz",cascade = {CascadeType.PERSIST,CascadeType.REMOVE})
    @JsonIgnore
    private Set<Question> question;

    @OneToMany(mappedBy = "quiz",cascade = {CascadeType.PERSIST,CascadeType.REMOVE})
    @JsonIgnore
    private Set<Result> results;






}
