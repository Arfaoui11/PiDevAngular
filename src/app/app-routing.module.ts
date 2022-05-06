import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListFomateurComponent} from "./CoursesSpace/list-fomateur/list-fomateur.component";
import {FormationComponent} from "./CoursesSpace/formation/formation.component";
import {CalendarComponent} from "./CoursesSpace/calendar/calendar.component";
import {ListeFormationComponent} from "./CoursesSpace/liste-formation/liste-formation.component";
import {QuizComponent} from "./CoursesSpace/quiz/quiz.component";
import {CoursesFormComponent} from "./CoursesSpace/courses-form/courses-form.component";
import {HomeComponent} from "./BackEnd/home/home.component";
import {AddFomateurComponent} from "./CoursesSpace/add-fomateur/add-fomateur.component";
import {WelcomeComponent} from "./CoursesSpace/welcome/welcome.component";
import {QuestionComponent} from "./CoursesSpace/question/question.component";
import {CalendarCoursesComponent} from "./CoursesSpace/calendar-courses/calendar-courses.component";
import {DashboardComponent} from "./BackEnd/dashboard/dashboard.component";
import {VideoplaylistComponent} from "./CoursesSpace/videoplaylist/videoplaylist.component";
import {LoginComponent} from "./BackEnd/login/login.component";
import {RoutComponent} from "./CoursesSpace/chat/rout/rout.component";
import {HomeFComponent} from "./FontEnd/home-f/home-f.component";
import {BlogFormationComponent} from "./CoursesSpace/blog-formation/blog-formation.component";
import {LayoutFComponent} from "./FontEnd/layout-f/layout-f.component";
import {BlogDetailsComponent} from "./CoursesSpace/blog-details/blog-details.component";
import {PortfelioFormComponent} from "./CoursesSpace/portfelio-form/portfelio-form.component";
import {PortfelioFormDetailsComponent} from "./CoursesSpace/portfelio-form-details/portfelio-form-details.component";
import {UserViewComponent} from "./CoursesSpace/user-view/user-view.component";
import {MapComponent} from "./CoursesSpace/map/map.component";
import {MyCoursesComponent} from "./CoursesSpace/my-courses/my-courses.component";
import {CalendarFrontComponent} from "./CoursesSpace/calendar-front/calendar-front.component";
import {QestionQuizCoursesComponent} from "./CoursesSpace/qestion-quiz-courses/qestion-quiz-courses.component";
import {E404Component} from "./FontEnd/e404/e404.component";
import {CallVideoComponent} from "./CoursesSpace/call-video/call-video.component";
import {AddPartnerInstitutionComponent} from "./backup/ExchangeStudents/add-partner-institution/add-partner-institution.component";
import {ListOfPartnersComponent} from "./backup/ExchangeStudents/list-of-partners/list-of-partners.component";
import {AddAppointmentComponent} from "./backup/add-appointment/add-appointment.component";
import {AppointmentListComponent} from "./backup/appointment-list/appointment-list.component";
import {AddComplaintComponent} from "./backup/add-complaint/add-complaint.component";
import {ComplaintListComponent} from "./backup/complaint-list/complaint-list.component";
import {UpdateComplaintComponent} from "./backup/update-complaint/update-complaint.component";
import {UpdateAppointmentComponent} from "./backup/update-appointment/update-appointment.component";
import {ListTopicComponent} from "./backup/Forum/list-topic/list-topic.component";
import {TeamComponent} from "./CoursesSpace/team/team.component";
import {RegisterComponent} from "./BackEnd/register/register.component";




const routes: Routes =

   [

     {path:'login',component: LoginComponent },
     {path:'register',component: RegisterComponent },
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
             { path: 'team',  component: TeamComponent },
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
          { path: 'videoplaylist/:idCourses', component: VideoplaylistComponent },
          { path: 'formateur', component: ListFomateurComponent },
          { path: 'addFormation', component: FormationComponent },
          { path: 'listFormateur', component: ListFomateurComponent } ,
          { path: 'calendar', component: CalendarComponent },
          { path: 'calendarCourses/:idFormer', component: CalendarCoursesComponent },
          { path: 'listFormation', component: ListeFormationComponent },
          { path: 'Courses', component: CoursesFormComponent },
          { path: 'Quiz/:idCourses', component: QuestionComponent },
          { path: 'Question/:idQuiz', component: QestionQuizCoursesComponent },
          { path: 'userview/:idUser', component: UserViewComponent },
          { path: 'login', component: LoginComponent },


        ]
      }
      ,
      {
        path:'Exchange-Student-Management',
        children: [
          { path: 'addUniversity', component: AddPartnerInstitutionComponent },
          { path: 'ListUniversities', component: ListOfPartnersComponent },


        ]

      },
      {
        path: 'helpSpace-Management',
        children: [


          { path: 'addAppointment', component: AddAppointmentComponent },
          { path: 'ListAppointment', component: AppointmentListComponent },
          { path: 'addComplaint', component: AddComplaintComponent },
          { path: 'ListComplaint', component: ComplaintListComponent } ,
          { path: 'updateComplaint/:id', component: UpdateComplaintComponent },
          { path: 'updateAppointment/:id', component: UpdateAppointmentComponent },

        ]

      },

      {
        path: 'Forum-management',
        children: [

          { path: 'ListTopic', component: ListTopicComponent },

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
