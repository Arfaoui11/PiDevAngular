import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from "../core/model/Quiz";
import {Question} from "../core/model/Question";
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "ngx-qrcode2";
import {QuizService} from "../services/quiz.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-qestion-quiz-courses',
  templateUrl: './qestion-quiz-courses.component.html',
  styleUrls: ['./qestion-quiz-courses.component.scss']
})
export class QestionQuizCoursesComponent implements OnInit {




  @Input() question:Question =new Question();

  page = 1;
  public Items: number;
  public ListQuestion :Question[]=[] ;

  elementType= NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.MEDIUM;

  public idQuiz :number;


  constructor(private questionService: QuizService, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.idQuiz = this.route.snapshot.params['idQuiz'];



    this.questionService.getQuestionByQuiz(this.idQuiz).subscribe(
      data=> {
        this.ListQuestion =data
      }
    );


  }







  getQuizQuestion()
  {
    this.questionService.getQuestionByQuiz(this.idQuiz).subscribe(
      data=> {
        this.ListQuestion =data;
        this.Items = this.ListQuestion.length;
      }
    );
    return this.ListQuestion;
  }





  addQuestion()
  {
    this.questionService.addQuestion(this.question,this.idQuiz).subscribe(data =>
    this.getQuizQuestion()
    )

  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getQuizQuestion();
  }


  deleteQuestion(idQ : number)
  {
    this.questionService.deleteQuestion(idQ).subscribe(
      data=> {
        this.getQuizQuestion();
      }
    )
  }

}
