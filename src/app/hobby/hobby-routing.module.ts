import {NgModule} from "@angular/core";
import {RouterModule } from '@angular/router';
import {AuthGuard} from "./shared/auth-guard.service";

import {HotelsListFullComponent} from './edit/hotels-list-full-info/hotels-list-full-info.component';
import { HotelListComponent } from "./hotels-lists/hotels-list.component";
import { AdminComponent } from "./admin/admin.component";

@NgModule({
    imports:[
        RouterModule.forChild([
            {path:"hobby", component: HotelListComponent},
            {path:"hobby/admin", component: AdminComponent},
            {path:"hobby/edit", component: HotelsListFullComponent, canActivate:[AuthGuard]}
        ])
    ],
    exports: [RouterModule]
})


export class HobbyRoutingModule{}