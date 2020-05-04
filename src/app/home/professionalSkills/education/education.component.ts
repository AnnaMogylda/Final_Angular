import { Component } from '@angular/core';
import {EducationsData} from "./education.interface"


@Component({
    selector: 'education',
    templateUrl: 'education.component.html',
    styleUrls: ['../professionalSkills.component.css']
})

export class EducationComponent{ 

dataEducations:EducationsData[] = [
    { institution: "Kyiv National Economic University named after Vadym Hetman",
      dateAttended: "2008 – 2013", 
      qualification: "OEF, Accounting and Audit (Master’s degree)"
    },
    { institution: "National Pedagogical Dragomanov University",
      dateAttended: "2012 – 2014", 
      qualification: "FPF, English language (Bachelor’s degree)"
    },
]
}
