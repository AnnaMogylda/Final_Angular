import { Component } from '@angular/core';
import {EducationsHeaders, EducationsData} from "./education.interfaces"


@Component({
    selector: 'education',
    templateUrl: 'education.component.html'
})

export class EducationComponent{ 

headersEducations:EducationsHeaders = {
    institution: "Institution",
    dateAttended:"Date(s) Attended:",
    qualification:"Qualification(s):",
}

dataEducations:EducationsData[] = [
    {institution: "Kyiv National Economic University named after Vadym Hetman", dateAttended: "September 2008 – May 2012", qualification: "Master’s degree in Accounting and Audit"},
    {institution: "National Pedagogical Dragomanov University", dateAttended: "October 2012 – June 2014", qualification: "Bachelor’s degree in English language"},
]

}
