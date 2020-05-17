import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import {HotelsRoutingModule} from "./hotels-routing.module";
import {AuthGuard} from "./shared/auth-guard.service";

import {EditModule} from "./edit/edit.module";
import {HotelListComponent} from "./hotels-lists/hotels-list.component";
import {AdminComponent} from "./admin/admin.component";
import {HotelsService} from "./shared/hotels-list.service";
import { AuthService } from './shared/auth.service';


@NgModule({
    declarations: [
        AdminComponent,
        HotelListComponent,
    ],
    imports:[
        CommonModule,
        HotelsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        EditModule
    ],
    providers:[HotelsService,
        AuthGuard,
        AuthService],
})

export class HotelsModule {}