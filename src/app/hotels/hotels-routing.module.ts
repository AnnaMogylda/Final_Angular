import {NgModule} from "@angular/core";
import {RouterModule } from '@angular/router';
import {AuthGuard} from "./shared/auth-guard.service";

import {HotelsListFullComponent} from './edit/hotels-list-full-info/hotels-list-full-info.component';
import { HotelListComponent } from "./hotels-lists/hotels-list.component";
import { AdminComponent } from "./admin/admin.component";

@NgModule({
    imports:[
        RouterModule.forChild([
            {path:"hotels", component: HotelListComponent},
            {path:"hotels/admin", component: AdminComponent},
            {path:"hotels/edit", component: HotelsListFullComponent, canActivate:[AuthGuard]}
        ])
    ],
    exports: [RouterModule]
})


export class HotelsRoutingModule{}