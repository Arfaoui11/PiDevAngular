import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GoogleChartsModule} from "angular-google-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbCollapseModule, NgbModalModule, NgbModule, NgbNavModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from "ngx-pagination";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";

import {

  ScheduleAllModule,

  RecurrenceEditorModule, ScheduleModule
} from "@syncfusion/ej2-angular-schedule";
import { CalendarComponent } from './calendar/calendar.component';
import {ListFomateurComponent} from "./list-fomateur/list-fomateur.component";
import {FormationComponent} from "./formation/formation.component";
import {AddFomateurComponent} from "./add-fomateur/add-fomateur.component";
import { ListeFormationComponent } from './liste-formation/liste-formation.component';
import {DayPilotModule} from "daypilot-pro-angular";

import { FlatpickrModule } from 'angularx-flatpickr';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {SidebarModule, TreeViewModule} from "@syncfusion/ej2-angular-navigations";
import { QuizComponent } from './quiz/quiz.component';
import { ChangeBgDirective } from './change-bg.directive';
import {NgxQRCodeModule} from "ngx-qrcode2";
import { CoursesFormComponent } from './courses-form/courses-form.component';

import {WelcomeComponent} from "./welcome/welcome.component";
import { QuestionComponent } from './question/question.component';
import {DialogModule} from "@syncfusion/ej2-angular-popups";
import {ComboBoxModule, DropDownListModule, MultiSelectModule} from "@syncfusion/ej2-angular-dropdowns";
import {ButtonModule, CheckBoxModule, RadioButtonModule, SwitchModule} from "@syncfusion/ej2-angular-buttons";
import { AddEditFormerComponent } from './add-edit-former/add-edit-former.component';
import {MaskedTextBoxModule, TextBoxModule} from "@syncfusion/ej2-angular-inputs";
import {APP_BASE_HREF, CommonModule, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {ToastModule} from "@syncfusion/ej2-angular-notifications";
import { CalendarCoursesComponent } from './calendar-courses/calendar-courses.component';
import {DragAndDropModule} from "angular-draggable-droppable";
import {Angulartics2Module} from "angulartics2";
import {environment} from "../environments/environment";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {VgCoreModule} from "@videogular/ngx-videogular/core";
import {VgBufferingModule} from "@videogular/ngx-videogular/buffering";
import {VgOverlayPlayModule} from "@videogular/ngx-videogular/overlay-play";
import {VgControlsModule} from "@videogular/ngx-videogular/controls";
import { VideoplaylistComponent } from './videoplaylist/videoplaylist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import {DatePickerModule, TimePickerModule} from "@syncfusion/ej2-angular-calendars";

import {NgxWebstorageModule} from "ngx-webstorage";
import { RoutComponent } from './chat/rout/rout.component';
import { ChatstreamComponent } from './chat/chatstream/chatstream.component';
import { ListUserComponent } from './chat/list-user/list-user.component';
import {ChatComponent} from "./chat/chat/chat.component";
import { HomeFComponent } from './FontEnd/home-f/home-f.component';
import { BlogFormationComponent } from './blog-formation/blog-formation.component';
import {HomeComponent} from "./home/home.component";
import {FooterComponent} from "./footer/footer.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {LayoutComponent} from "./layout/layout.component";
import {SidbarComponent} from "./sidbar/sidbar.component";
import {NavbarFComponent} from "./FontEnd/navbar-f/navbar-f.component";
import {LayoutFComponent} from "./FontEnd/layout-f/layout-f.component";
import {FooterFComponent} from "./FontEnd/footer-f/footer-f.component";
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { PortfelioFormComponent } from './portfelio-form/portfelio-form.component';
import { PortfelioFormDetailsComponent } from './portfelio-form-details/portfelio-form-details.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { UserViewComponent } from './user-view/user-view.component';


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);




@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ListFomateurComponent,
    AddFomateurComponent,
    FormationComponent,
    ListeFormationComponent,
    QuizComponent,
    ChangeBgDirective,
    CoursesFormComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    LayoutComponent,
    SidbarComponent,
    WelcomeComponent,
    QuestionComponent,
    AddEditFormerComponent,
    CalendarCoursesComponent,
    VideoplaylistComponent,
    DashboardComponent,
    LoginComponent,
    ChatComponent,
    RoutComponent,
    ChatstreamComponent,
    ListUserComponent,
    HomeFComponent,
    BlogFormationComponent,
    NavbarFComponent,
    FooterFComponent,
    LayoutFComponent,
    BlogDetailsComponent,
    PortfelioFormComponent,
    PortfelioFormDetailsComponent,
    ChatBotComponent,
    UserViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScheduleModule,
    RecurrenceEditorModule,
    DropDownListModule,
    MultiSelectModule,
    ComboBoxModule,
    CheckBoxModule,
    ButtonModule,
    SwitchModule,
    RadioButtonModule,
    TreeViewModule,
    DatePickerModule,
    TimePickerModule,
    SidebarModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    BrowserAnimationsModule,
    TextBoxModule,
    MaskedTextBoxModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxQRCodeModule,
    GoogleChartsModule,
    MatButtonModule,
    MatSnackBarModule,
    NgbModule,
    FullCalendarModule,
    DayPilotModule,
    ScheduleAllModule,
    NgbNavModule,
    NgbCollapseModule,
    NgxWebstorageModule.forRoot(),
    NgbTooltipModule,
    ClipboardModule,
    DragAndDropModule,
    Angulartics2Module.forRoot({
      developerMode: !environment.production,
    }),
    CommonModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),

  ],
  providers: [CalendarComponent, { provide: APP_BASE_HREF, useValue: '/' }, Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
