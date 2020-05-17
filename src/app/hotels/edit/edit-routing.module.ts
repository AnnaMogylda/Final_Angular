
import {NgModule} from "@angular/core";
import {RouterModule } from '@angular/router';

import {CreateEditListComponent} from "./hotel-create-edit/create-edit.component";
import {ShowMoreInfoComponent} from "./hotel-show-more-info/show-more-info.component";
import {HotelsListFullComponent} from "./hotels-list-full-info/hotels-list-full-info.component";


@NgModule({
    imports:[
        RouterModule.forChild([
            {   path:"edit",
            component: HotelsListFullComponent},
            {path:"edit/create", component: CreateEditListComponent},
            {path:"edit/showinfo/:id", component: ShowMoreInfoComponent},
            {path:"edit/edit/:id", component: CreateEditListComponent},
            {path:"", redirectTo: "edit", pathMatch:"full"}
        ])
    ],
    exports: [RouterModule]
})


export class EditRoutingModule{}