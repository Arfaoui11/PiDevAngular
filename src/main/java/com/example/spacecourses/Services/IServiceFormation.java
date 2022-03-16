package com.example.spacecourses.Services;



import com.example.spacecourses.Entity.*;
import org.springframework.data.repository.query.Param;

import javax.servlet.http.HttpServletResponse;
import java.io.FileNotFoundException;
import java.util.Date;
import java.util.List;
import java.util.TreeMap;

public interface IServiceFormation {

    void ajouterFormateur(User formateur);


    void addFormation(Formation formation);
    void updateFormation(Formation formation, Integer idFormateur);
    void deleteFormation(Integer idFormation);
    List<Formation> afficherFormation();
    List<User> afficherFormateur();
    List<User> afficherApprenant();

    User FormateurwithMaxHo();

     User getFormateurRemunerationMaxSalaire();

     TreeMap<Integer, User> getFormateurRemunerationMaxSalaireTrie();

    List<Object> getFormateurRemunerationByDateTrie();

    void CertifactionStudents();


    List<Formation>  SearchMultiple(String key);







    void ajouterApprenant(User apprenant);
    void ajouterEtAffecterFormationAFormateur(Formation formation, Integer idFormateur);
    Formation getFile(Integer fileId) throws FileNotFoundException;


    void affecterApprenantFormationWithMax(Integer idApprenant, Integer idFormation);

    void affecterApprenantFormation(Integer idApprenant,Integer idFormation);




    Integer nbrCoursesParFormateur(Integer idF,Date dateDebut, Date dateFin);

    Integer getNbrApprenantByFormation(String title);
    void getNbrApprenantByFormationn();

    Integer getNbrFormationByApprenant(Integer idApp,Domain domain ,Date dateDebut, Date dateFin);

    List<Object[]> getNbrApprenantByFormation();
    List<User> getApprenantByFormation(Integer idF);


    Integer getFormateurRemunerationByDate(Integer idFormateur, Date dateDebut,Date dateFin);
    Integer getRevenueByFormation(Integer idFormation);



    void likeFormation(Integer idF);
    void dislikeFormation(Integer idF);



    void SearchHistorique(String keyword);






}
