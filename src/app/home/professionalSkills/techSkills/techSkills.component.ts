import { Component } from '@angular/core';
import {TechSkillsData, TechSkillsHeaders } from "./techSkills.interface";


@Component({
    selector: 'techSkills',
    templateUrl: 'techSkills.component.html'
    // styleUrls: ['home.component.css']
})

export class TechSkillsComponent{ 
    skillsHeader:TechSkillsHeaders = {
        category:"Skill Category",
        list: "Skill List"
    }

    skillsData:TechSkillsData[] = [
        {category: "Programming Languages", list: "JavaScript"},
        {category: "Web", list: "HTML5, CSS3, JavaScript, TypeScript"},
        {category: "Frameworks", list: "Bootstrap, Angular2"},
        {category: "Preprocessors", list: "SASS, SCSS"},
        {category: "Task managers", list: "Gulp, Jira"},
        {category: "Operating Systems", list: "Windows XP, Windows 7/10"},
        {category: "Development Tools", list: "Visual Studio Code, WebStorm"},
        {category: "Other", list: "BI, FRED"}
    ];
}
