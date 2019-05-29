import { Component } from '@angular/core';


@Component({
    selector: 'experience',
    templateUrl: 'experience.component.html'
    // styleUrls: ['home.component.css']
})

export class ExperienceComponent{ 

    experienceHeader = {
        company: "Company:",
        duration: "Duration:",
        role: "Role:",
        projName: "Project Name:",
        projDesc: "Project description:",
        responsibilites: "Responsibilities:",
        technologies: "Technologies:"
    }

    experienceData = {
        company: "ControlPay Ukraine (Kiev, Ukraine)",
        duration: "December 2012 – Present",
        role: "Database Analyst",
        projName: "FRED"
        
    }
}