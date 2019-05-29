import { Component, OnInit } from "@angular/core";
import { CoursesService } from '../shared/courses.service';
import {CoursesList} from "../shared/courses-lists.interface";
import { Router } from '@angular/router';


@Component({
    selector: 'courses',
    templateUrl: 'courses-list.component.html',
    styleUrls: ['courses-list.component.css']
})

export class CoursesListComponent implements OnInit {  
    
    courses:CoursesList[];

    constructor(private router:Router, private CoursesService:CoursesService){}

    ngOnInit(){
        this.CoursesService    
        .showAll()
        .then(result=> this.courses=result); 
      
    }
    
    onSelect(course:CoursesList){
        this.router.navigate(["/courses", course.name]);
    }
   
}

