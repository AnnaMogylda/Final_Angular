import { Component } from '@angular/core';


@Component({
  selector: 'professionalSkills-root',
  templateUrl: 'professionalSkills.component.html',
  styleUrls: ['professionalSkills.component.css']
})
export class ProfessionalSkillsComponent {
showInfo:boolean = false;
tabs:string[] = ["education", "experience", "skills"];
msg:string="";

constructor(){};

test(){
   this.msg=="hello"
}


}
