import { Component } from '@angular/core';
import {LanguageData} from "./language.interface"
 
@Component({
    selector: 'languages',
    templateUrl: 'languages.component.html',
    styleUrls: ['../professionalSkills.component.css']
})

export class LanguagesComponent{ 
   
    languageData:LanguageData[] = [
        {language: "Ukrainian", written: "mother tongue", spoken: "mother tongue"},
        {language: "Russian", written: "mother tongue", spoken: "mother tongue"},
        {language: "English", written: "upper-intermediate", spoken: "advanced"},
        {language: "German", written: "beginning", spoken: "beginning"}
    ];    

}
