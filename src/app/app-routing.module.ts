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
import {RoutComponent} from "./chat/rout/rout.component";
import {HomeFComponent} from "./FontEnd/home-f/home-f.component";
import {BlogFormationComponent} from "./blog-formation/blog-formation.component";
import {LayoutFComponent} from "./FontEnd/layout-f/layout-f.component";
import {BlogDetailsComponent} from "./blog-details/blog-details.component";
import {PortfelioFormComponent} from "./portfelio-form/portfelio-form.component";
import {PortfelioFormDetailsComponent} from "./portfelio-form-details/portfelio-form-details.component";
import {UserViewComponent} from "./user-view/user-view.component";
import {MapComponent} from "./map/map.component";
import {MyCoursesComponent} from "./my-courses/my-courses.component";
import {CalendarFrontComponent} from "./calendar-front/calendar-front.component";
import {QestionQuizCoursesComponent} from "./qestion-quiz-courses/qestion-quiz-courses.component";
import {E404Component} from "./e404/e404.component";
import {CallVideoComponent} from "./call-video/call-video.component";




const routes: Routes =

   [

     {path:'login',component: LoginComponent },
     {path:'chatRoom/:idCourses',component: CallVideoComponent },
     {path:'homeF',component: HomeFComponent },
     { path: '',  redirectTo: '/front/End/homeF', pathMatch: 'full' },
     {
       path: 'front',
       component: LayoutFComponent,
       children: [
         {
           path: 'End',
           children: [
             { path: 'portForm', component: PortfelioFormComponent },
             { path: 'blogF', component: BlogFormationComponent },
             { path: 'portF/:idCourses', component: PortfelioFormDetailsComponent },
             { path: 'chat', component: RoutComponent },
             { path:  'map',component: MapComponent },
             { path: 'homeF', component: HomeFComponent },
             { path: 'myCourses', component: MyCoursesComponent },
             { path: 'myCalender', component: CalendarFrontComponent },
             { path: 'detailsF/:idCourses', component: BlogDetailsComponent },
             { path: 'quiz/:idQuiz', component: QuizComponent },
             { path: 'quizWelcome', component: WelcomeComponent },
             { path: '**', pathMatch: 'full',  component: E404Component },

           ]
         },
       ]
     },

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
          { path: 'calendarCourses/:idFormer', component: CalendarCoursesComponent },
          { path: 'listFormation', component: ListeFormationComponent },


          { path: 'Courses', component: CoursesFormComponent },
          { path: 'Quiz/:idCourses', component: QuestionComponent },
          { path: 'Question/:idQuiz', component: QestionQuizCoursesComponent },
          { path: 'videoplaylist/:idCourses', component: VideoplaylistComponent },
          { path: 'userview/:idUser', component: UserViewComponent },
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
