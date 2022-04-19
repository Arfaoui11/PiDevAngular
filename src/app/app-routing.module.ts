import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListFomateurComponent} from "./list-fomateur/list-fomateur.component";
import {FormationComponent} from "./formation/formation.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {ListeFormationComponent} from "./liste-formation/liste-formation.component";
import {QuizComponent} from "./quiz/quiz.component";
import {CoursesFormComponent} from "./courses-form/courses-form.component";
import {HomeComponent} from "./home/home.component";
import {AddFomateurComponent} from "./add-fomateur/add-fomateur.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {QuestionComponent} from "./question/question.component";
import {CalendarCoursesComponent} from "./calendar-courses/calendar-courses.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {VideoplaylistComponent} from "./videoplaylist/videoplaylist.component";
import {LoginComponent} from "./login/login.component";


const routes: Routes =
  /*[
  {path : 'formateur' ,component: ListFomateurComponent},
  {path: 'addFormation',component:FormationComponent},
  {path: 'listFormateur',component:ListFomateurComponent},
  {path: 'calendar',component:CalendarComponent},
  {path: 'listFormation',component:ListeFormationComponent},
  {path: 'quiz',component:QuizComponent},
  {path: 'Courses',component:CoursesFormComponent},


];*/
   [
     {path:'',component: HomeComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'Formation-management',
        children: [

          { path: 'addFormateur', component: AddFomateurComponent },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'formateur', component: ListFomateurComponent },
          { path: 'addFormation', component: FormationComponent },
          { path: 'listFormateur', component: ListFomateurComponent } ,
          { path: 'calendar', component: CalendarComponent },
          { path: 'calendarCourses', component: CalendarCoursesComponent },
          { path: 'listFormation', component: ListeFormationComponent },
          { path: 'quiz', component: QuizComponent },
          { path: 'quizWelcome', component: WelcomeComponent },
          { path: 'Courses', component: CoursesFormComponent },
          { path: 'Question/:idCourses', component: QuestionComponent },
          { path: 'videoplaylist/:idCourses', component: VideoplaylistComponent },
          { path: 'login', component: LoginComponent },

        ]
      },
  ]
  }
];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
