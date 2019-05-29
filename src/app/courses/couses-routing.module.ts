import {NgModule} from "@angular/core";
import {RouterModule } from '@angular/router';

import { CoursesListComponent } from "./courses-list/courses-list.component";
import { CoursesDetailsComponent } from "./courses-details/courses-details.component";

@NgModule({
    imports:[
        RouterModule.forChild([
            {path:"courses", component: CoursesListComponent},
            {path:"courses/:name", component: CoursesDetailsComponent}
        ])
    ],
    exports: [RouterModule]
})


export class CoursesRoutingModule{}