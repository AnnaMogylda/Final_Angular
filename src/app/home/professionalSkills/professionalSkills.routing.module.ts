import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { EducationComponent } from "./education/education.component";
import {ExperienceComponent} from "./experience/experience.component";


const routesProfessionalSkills: Routes = [
    {path:'', redirectTo: "home", pathMatch: "full"},
  ];
  
  
  @NgModule({
    imports: [RouterModule.forRoot(routesProfessionalSkills)],
    exports: [RouterModule]
  })

export class ProfessionalSkillsRoutingModule { }
