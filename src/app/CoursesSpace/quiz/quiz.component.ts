import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {QuizService} from "../services/quiz.service";
import {interval} from "rxjs";
import {Question} from "../../core/model/Question";
import {Quiz} from "../../core/model/Quiz";
import {Formation} from "../../core/model/Formation";
import {Result} from "../../core/model/Result";
import {TokenService} from "../services/token.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  public ListQuestion :Question[]=[] ;

  @ViewChild('name') nameKey!: ElementRef;

  @Input() result : Result = new Result;

  res = new Result();

  nom : string ;




  public idQuiz :number;

  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 30;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;
  currentUser: any;


  constructor(private questionService: QuizService,private tokenStorageService: TokenService, private route:ActivatedRoute) {


  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();

    this.idQuiz = this.route.snapshot.params['idQuiz'];

   // this.name = localStorage.getItem("name")!;
   // this.getAllQuestions();
    this.startCounter();
    this.getQuizQuestion();

  }




  getQuizQuestion()
  {
    this.questionService.getQuizQuestion(this.idQuiz)
      .subscribe( (data : Question[])=>{this.ListQuestion = data});
    return this.ListQuestion;
  }

  nextQuestion() {
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }
  answer(currentQno: number,i:number, option: Question) {


    if (this.isCorrect(i,option)) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);


    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 500);

     // this.points -= 10;
    }
    if(currentQno === this.ListQuestion.length){

      setTimeout(()=>{
        this.isQuizCompleted = true;
        this.saveScoreQuiz(this.currentUser.id,this.idQuiz);
        this.stopCounter();
      },500);

    }


  }
  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 30;
          this.points -= 10;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 300000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 30;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getQuizQuestion()
    this.points = 0;
    this.counter = 30;
    this.currentQuestion = 0;
    this.progress = "0";

  }

  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.ListQuestion.length) * 100).toString();
    return this.progress;
  }

  isCorrect(i: number,question :Question)  {
    return question.ans == i;
  }



  saveScoreQuiz(idU:number,idQ:number)
  {
    this.res.totalCorrect=this.points;
    this.res.correctAnswer=this.correctAnswer;
    this.res.inCorrectAnswer=this.inCorrectAnswer;
    this.res.username=this.currentUser.displayName;
    this.questionService.saveScore(this.res,idU,idQ).subscribe(
      res => {console.log(res);});

    setTimeout( () =>
    {
      window.location.href = '#/front/End/myCourses';
    },2000);
  }

}
