import { Component } from '@angular/core';

@Component({
    selector: 'generalInfo',
    templateUrl: 'home.generalInfo.component.html',
    styleUrls: ['home.generalInfo.component.css']
})

export class HomeGeneralInfoComponent{ 
    name:string = "Anna Lyvytska";
    age:number = 27;
    period: string =  "one";
}
