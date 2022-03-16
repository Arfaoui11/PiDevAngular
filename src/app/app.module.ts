import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {GoogleChartsModule} from "angular-google-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from "ngx-pagination";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/moment";
import {RecurrenceEditorAllModule, ScheduleAllModule,DayService, WeekService, WorkWeekService, MonthService, AgendaService, TimelineViewsService,
  TimelineMonthService, ResizeService, DragAndDropService, EventSettingsModel, ActionEventArgs,
  ScheduleComponent, CellClickEventArgs, TimeScaleModel, GroupModel,
  PopupOpenEventArgs, EJ2Instance, getWeekFirstDate, addDays, NavigatingEventArgs, WorkHoursModel} from "@syncfusion/ej2-angular-schedule";
import { CalendarComponent } from './calendar/calendar.component';
import {ListFomateurComponent} from "./list-fomateur/list-fomateur.component";
import {FormationComponent} from "./formation/formation.component";
import {AddFomateurComponent} from "./add-fomateur/add-fomateur.component";
import { ListeFormationComponent } from './liste-formation/liste-formation.component';
import {DayPilotModule} from "daypilot-pro-angular";



import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {TreeViewModule} from "@syncfusion/ej2-angular-navigations";
import { QuizComponent } from './quiz/quiz.component';
import { ChangeBgDirective } from './change-bg.directive';
import {NgxQRCodeModule} from "ngx-qrcode2";
import { CoursesFormComponent } from './courses-form/courses-form.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutComponent } from './layout/layout.component';
import { SidbarComponent } from './sidbar/sidbar.component';
import {WelcomeComponent} from "./welcome/welcome.component";
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
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    NgxQRCodeModule,
    GoogleChartsModule,
    MatButtonModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    TreeViewModule,
    NgbModule,
    FullCalendarModule,
    DayPilotModule,
    ScheduleAllModule,RecurrenceEditorAllModule,
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, TimelineViewsService,
    TimelineMonthService, ResizeService, DragAndDropService],
  bootstrap: [AppComponent]
})
export class AppModule { }
