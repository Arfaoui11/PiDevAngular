import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListFomateurComponent} from "./list-fomateur/list-fomateur.component";
import {FormationComponent} from "./formation/formation.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {ListeFormationComponent} from "./liste-formation/liste-formation.component";
import {QuizComponent} from "./quiz/quiz.component";
import {CoursesFormComponent} from "./courses-form/courses-form.component";
import {HomeComponent} from "./home/home.component";
import {LayoutComponent} from "./layout/layout.component";
import {AddFomateurComponent} from "./add-fomateur/add-fomateur.component";
import {WelcomeComponent} from "./welcome/welcome.component";

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
   [ { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'Formation-management',
        children: [

          { path: 'addFormateur', component: AddFomateurComponent },
          { path: 'formateur', component: ListFomateurComponent },
          { path: 'addFormation', component: FormationComponent },
          { path: 'listFormateur', component: ListFomateurComponent } ,
          { path: 'calendar', component: CalendarComponent },
          { path: 'listFormation', component: ListeFormationComponent },
          { path: 'quiz', component: QuizComponent },
          { path: 'quizWelcome', component: WelcomeComponent },
          { path: 'Courses', component: CoursesFormComponent },

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
