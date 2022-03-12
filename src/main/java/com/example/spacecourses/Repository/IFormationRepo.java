package com.example.spacecourses.Repository;


import com.example.spacecourses.Entity.Domain;
import com.example.spacecourses.Entity.Formation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface IFormationRepo extends CrudRepository<Formation,Integer> {

    @Query(value= "select SUM(f.nbrHeures*f.formateur.tarifHoraire) from Formation f where f.formateur.id=:id and f.start>=:dateD and f.end<=:dateF")
    Integer getFormateurRemunerationByDate(@Param("id") Integer idFormateur, @Param("dateD") Date dateDebut, @Param("dateF") Date dateFin);

    @Query(value= "select SUM(f.nbrHeures*f.formateur.tarifHoraire) ,f.formateur from Formation f where f.start>=:dateD and f.end<=:dateF group by f.formateur order by SUM(f.nbrHeures*f.formateur.tarifHoraire) ")
    List<Object> getFormateurRemunerationByDateTrie(@Param("dateD") Date dateDebut, @Param("dateF") Date dateFin);


    @Query(value= "select SUM(f.nbrHeures*f.formateur.tarifHoraire) from Formation f where f.formateur.id=:id and f.formateur.role=0")
    Integer getFormateurRemuneration(@Param("id") Integer idFormateur);

    @Query(value="select count(a.id) from Formation f join f.apprenant a where f.title=:titre")
    Integer getNbrApprenantByFormation(@Param("titre") String titre);

    @Query(value="select count(a.id) from Formation f join f.apprenant a where f.idFormation=:id")
    Integer getNbrApprenantByFormationId(@Param("id") Integer id);

    @Query(value = "select count(f.idFormation) from Formation f join f.apprenant a where a.id=:id and f.start>=:dateD and f.end<=:dateF and f.domain=:domain")
    Integer getNbrFormationByApprenant(@Param("id") Integer idApp, @Param("domain") Domain domain , @Param("dateD") Date dateDebut, @Param("dateF") Date dateFin);




    @Query(value = "select count(f.idFormation) from Formation f join f.formateur fr where f.start>=:dateD and f.end<=:dateF and fr.id=:id")
    Integer nbrCoursesParFormateur(@Param("id") Integer idF, @Param("dateD") Date dateDebut, @Param("dateF") Date dateFin);

}
