import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";

import { ProfessionalSkillsRoutingModule } from "./professionalSkills.routing.module";
import { ProfessionalSkillsComponent} from "./professionalSkills.component";
import { EducationComponent } from "./education/education.component";
import { ExperienceComponent } from "./experience/experience.component";
import { TechSkillsComponent } from "./techSkills/techSkills.component";
import { LanguagesComponent } from "./languages/languages.component";
import { CertificatesComponent } from "./certificates/certificates.component";
import {TrainingsComponent} from "./trainings/trainings.component";

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
        CertificatesComponent,
        TrainingsComponent
    ],
    exports: [
        ProfessionalSkillsComponent,
    ]
})


export class professionalSkillsModule { }