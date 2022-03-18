import {Component, Input, OnInit} from '@angular/core';
import {QuizService} from "../services/quiz.service";
import {Quiz} from "../core/model/Quiz";
import {Question} from "../core/model/Question";
import {ActivatedRoute} from "@angular/router";
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "ngx-qrcode2";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {


  @Input() quiz:Quiz =new Quiz();


  @Input() question:Question =new Question();

  public listQuiz  : Quiz[] = [];
  public ListQuestion :Question[]=[] ;

  elementType= NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.MEDIUM;

  public idFormation :number;


  constructor(private questionService: QuizService, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.idFormation = this.route.snapshot.params['idCourses']

    console.log(this.idFormation);

    this.questionService.getQuizByForm(this.idFormation).subscribe(
      data=> {
        this.listQuiz=data
      }
    );


  }

  getAllQuestions() {
    this.questionService.getQuestionJson()
      .subscribe(res => {
        this.listQuiz = res.questions;
      })
  }


  getQuizbyFormation(id:number)
  {
    this.questionService.getQuizByForm(id).subscribe(
      data=> {
        this.listQuiz=data
      }
    )
    return this.listQuiz;
  }


  getQuizQuestion(idQuiz:number)
  {
    this.questionService.getQuizQuestion(idQuiz)
      .subscribe( (data : Question[])=>{this.ListQuestion = data});
    return this.ListQuestion;
  }


  addQuiz()
  {
   this.questionService.addQuiz(this.quiz,this.idFormation).subscribe(
     data => {
        this.getQuizbyFormation(this.idFormation)
     }
   )
  }


  addQuestion(idQ:number)
  {
    this.questionService.addQuestion(this.question,idQ).subscribe(

    )
  }

  deleteQuiz(idQ : number)
  {
    this.questionService.deleteQuiz(idQ).subscribe(
      data=> {
        this.getQuizbyFormation(this.idFormation)
      }
    )
  }

  dataId(idQuiz: number) {


  }
}
