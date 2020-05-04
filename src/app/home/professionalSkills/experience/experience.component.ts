import { Component } from '@angular/core';
import {ExperienceData} from './experience.interface'


@Component({
    selector: 'experience',
    templateUrl: 'experience.component.html',
    styleUrls: ['../professionalSkills.component.css']
})

export class ExperienceComponent{ 

experienceData: ExperienceData[]= 
    [
        {company: "ControlPay Ukraine",
        position: "Database Analyst",
        duration: "2012 – present",
        responsibilities: [
            "analysis, building logics and entering contracts to the database",
            "checking for correct data uploading and registration, data validation, reporting about bugs, impropriate work of converters, mapping files updates",
            "auditing shipment data files as well as freight invoices",
            "communicating with shippers and carriers",
            "Technologies used: FRED (database), Jira, BI, Microsoft XL"
        ]},
        {
        position: "Freelance",
        duration: "2019 – present",
        responsibilities: [
            "landing pages creation using flexbox, grid layouts, animations, cross-browser layouts",
            "working with DOM, events handling, data filtering and simple calculations",
            "creating to do list, using TypeScript and Angular7 – creating, editing, removing tasks, filtering tasks by date"

        ]},
    ]
        
}