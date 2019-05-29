import { Component } from '@angular/core';
import {TrainingHeaders, TrainingData } from "./trainings.interfaces";

@Component({
    selector: 'trainings',
    templateUrl: 'trainings.component.html',
    styleUrls: ['trainings.component.css']
})

export class TrainingsComponent{ 
    trainingHeaders:TrainingHeaders= {
        name: "Program Name:",
        dateEnded: "Date(s) Attended:",
        status: "Status:",
        provider: "Provider:",
        description: "Description:"
    };
    trainingData:TrainingData[] = [
        {name:"Skola", dateEnded:"July 2010", status:"Certified", provider: "SKOLA English in London", description: "Reading, writing, listening and speaking in English"},
        {name:"American English Center", dateEnded:"December 2010", status:"Completed", provider: "Center of learning English with American teachers", description: "Developing speaking skills in English"},  
        {name:"Yappi", dateEnded:"May 2011", status:"Certified", provider: "Green Forest", description: "Financial English"},
        {name:"1C", dateEnded:"December 2011", status:"Certified", provider: "Kyiv National Economic University named after Vadym Hetman", description: "Developing skills in 1C:Enterprise (version 8.0.2)	"},
    ]
}
