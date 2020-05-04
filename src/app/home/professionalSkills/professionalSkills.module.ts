import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";

import { ProfessionalSkillsRoutingModule } from "./professionalSkills.routing.module";
import { ProfessionalSkillsComponent} from "./professionalSkills.component";
import { EducationComponent } from "./education/education.component";
import { ExperienceComponent } from "./experience/experience.component";
import { TechSkillsComponent } from "./techSkills/techSkills.component";
import { LanguagesComponent } from "./languages/languages.component";
import { CoursesComponent } from "./courses/courses.component";

@NgModule({
    imports: [
        BrowserModule,
        ProfessionalSkillsRoutingModule
    ],
    declarations: [
        ProfessionalSkillsComponent,
        EducationComponent,
        TechSkillsComponent,
        ExperienceComponent,
        LanguagesComponent,
        CoursesComponent,
    ],
    exports: [
        ProfessionalSkillsComponent,
    ]
})


export class professionalSkillsModule { }