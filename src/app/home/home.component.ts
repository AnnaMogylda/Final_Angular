import { Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent{ 
    imagePath: string = "assets/img/avatar.jpg";
    professionalInfo:string[] = ["education", "skills", "experience"];
    showInfo:boolean = false;
    
   
    
  

    name: string = "Home";
    
}