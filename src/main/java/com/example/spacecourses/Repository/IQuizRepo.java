package com.example.spacecourses.Repository;

import com.example.spacecourses.Entity.Question;
import com.example.spacecourses.Entity.Quiz;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IQuizRepo extends CrudRepository<Quiz,Integer> {

    @Query(value = "select  a from Quiz q join q.question a where q.idQuiz=:id")
    List<Question> getQuizQuestion(@Param("id") Integer idQ);

}
