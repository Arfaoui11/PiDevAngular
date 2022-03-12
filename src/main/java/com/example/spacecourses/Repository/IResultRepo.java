package com.example.spacecourses.Repository;

import com.example.spacecourses.Entity.Result;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IResultRepo extends CrudRepository<Result,Integer> {
    Object findAll(Sort totalCorrect);
}
