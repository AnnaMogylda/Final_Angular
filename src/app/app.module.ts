import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeGeneralInfoComponent } from './home/generalInfo/home.generalInfo.component';

import { professionalSkillsModule } from './home/professionalSkills/professionalSkills.module';
import { CoursesModule } from "./courses/courses.module";
import {HobbyModule} from './hobby/hobby.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeGeneralInfoComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    professionalSkillsModule,
    CoursesModule,
    HobbyModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
