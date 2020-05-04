import { Component } from '@angular/core';

@Component({
    selector: 'techSkills',
    templateUrl: 'techSkills.component.html',
    styleUrls: ['../professionalSkills.component.css']
})

export class TechSkillsComponent{ 
    skillsData = [
        "HTML5, CSS3 (flex box, grid, block layout, animation)",
        "JavaScript (ES5, ES6)",
        "Bootstrap4",
        "jQuery",
        "TypeScript",
        "Angular2+",
        "SASS, SCSS",
        "Animate.css, wow.js",
        "Gulp, Webpack",
        "Git",
        "Visual Studio Code, WebStorm",
        "Windows XP, Windows 7/10"
    ];
}
