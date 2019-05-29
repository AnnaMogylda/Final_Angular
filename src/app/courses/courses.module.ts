import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoursesListComponent } from "./courses-list/courses-list.component";
import { CoursesDetailsComponent } from "./courses-details/courses-details.component";
import { CoursesRoutingModule } from "./couses-routing.module";
import {CoursesService} from "./shared/courses.service";
import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        CoursesListComponent,
        CoursesDetailsComponent
    ],
    imports:[
        CommonModule,
        CoursesRoutingModule,
        FormsModule
    ],
    providers:[CoursesService]
})

export class CoursesModule {}