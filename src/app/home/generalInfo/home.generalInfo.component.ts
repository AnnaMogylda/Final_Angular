import { Component } from '@angular/core';

@Component({
    selector: 'generalInfo',
    templateUrl: 'home.generalInfo.component.html',
    styleUrls: ['home.generalInfo.component.css']
})

export class HomeGeneralInfoComponent{ 
    experience:number = 1;
    email:string = "annmogilda@gmail.com";
    tel:String = "+38(066)5150098";
    skype:string = "";
    age:number = 28;

    qualities:String[] = [
        "Critical thinking and creativity, inquisitive and self-motivated person",
        "Good communication skills, collaboration with team member",
        "Skilled in multi-tasking and prioritizing competing deadlines"
    ]
}
	
