import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";

import {EditRoutingModule} from "./edit-routing.module";
import {EditComponent} from "./edit.component";
import {CreateEditListComponent} from "./hotel-create-edit/create-edit.component";
import {DeleteListComponent} from "./hotel-delete/delete.component";
import {HotelsListFullComponent} from "./hotels-list-full-info/hotels-list-full-info.component";
import {HotelsListFullService} from "../shared/hotels-lists-full.service";


@NgModule({
    declarations: [
        EditComponent,
        CreateEditListComponent,
        DeleteListComponent,
        HotelsListFullComponent
    ],
    imports:[
        CommonModule,
        EditRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers:[HotelsListFullService]
})

export class EditModule {}