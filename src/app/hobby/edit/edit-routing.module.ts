
import {NgModule} from "@angular/core";
import {RouterModule } from '@angular/router';

import {CreateEditListComponent} from "./hotel-create-edit/create-edit.component";
import {DeleteListComponent} from "./hotel-delete/delete.component";
import {HotelsListFullComponent} from "./hotels-list-full-info/hotels-list-full-info.component";


@NgModule({
    imports:[
        RouterModule.forChild([
            {   path:"edit",
            component: HotelsListFullComponent},
            {path:"edit/create", component: CreateEditListComponent},
            {path:"edit/edit/:id", component: CreateEditListComponent},
            {path:"edit/delete/:id", component: DeleteListComponent},
            {path:"", redirectTo: "edit", pathMatch:"full"}
        ])
    ],
    exports: [RouterModule]
})


export class EditRoutingModule{}