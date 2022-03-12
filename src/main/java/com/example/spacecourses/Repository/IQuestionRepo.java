package com.example.spacecourses.Repository;

import com.example.spacecourses.Entity.Question;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IQuestionRepo extends CrudRepository<Question,Integer> {
}
