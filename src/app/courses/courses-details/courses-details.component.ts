import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CourseDetails} from "../shared/courses-details.interface";
import {CoursesList} from "../shared/courses-lists.interface";
import { CoursesService } from '../shared/courses.service';

@Component({
    selector: 'courses',
    templateUrl: 'courses-details.component.html',
    styleUrls: ['courses-details.component.css']
})

export class CoursesDetailsComponent implements OnInit{
    course:CourseDetails;
    courses:CoursesList[];
    lessons:string[];

    constructor(private router:Router, private activatedRoute: ActivatedRoute, private CoursesService:CoursesService){}

    ngOnInit(){
        this.activatedRoute.params.forEach((params: Params) => {
            let name = params["name"];
            this.CoursesService
                .getCourseDetails(name)
                .then(result => {this.course = result, this.lessons = this.course.lessons, console.log(this.lessons)});                 
            });    
    }

    goToCoursesList(){
        this.router.navigate(["/courses"]);
    }
}