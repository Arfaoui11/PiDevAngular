package com.example.spacecourses.Repository;

import com.example.spacecourses.Entity.Result;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

@Repository
public interface IResultRepo extends CrudRepository<Result,Integer> {
    Object findAll(Sort totalCorrect);


    @Query(value = "select count(r.id) from Result r join r.sUser u where u.id=:idu ")
    Integer getNbrQuiz(@PathVariable("idu") Integer idU);

    @Query(value = "select sum(r.totalCorrect) from Result r join r.sUser u where u.id=:idu")
    Integer getScore(@PathVariable("idu") Integer idU);

}
