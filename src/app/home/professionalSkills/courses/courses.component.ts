import { Component } from '@angular/core';
import {CoursesData } from "./courses.interfaces";


@Component({
    selector: 'courses',
    templateUrl: 'courses.component.html',
    styleUrls: ['../professionalSkills.component.css']
})

export class CoursesComponent{ 
    coursesData: CoursesData[] = [
        { name: "Cyberbionic systematics", description:"Front-end Developer", year:"2018-2019"},
        { name: "EPAM", description:"Front-end program", year:"2018-2019"},
        { name: "Green Forest", description:"financial English", year:"2011"},
        { name: "American English Center", description:"speaking English", year:"2010"},
        { name: "Skola", description:"peaking and writing  English", year:"2010"},
        { name: "1C", description:"skills in 1C:8.0.2", year:"2011"},
    ];
}
