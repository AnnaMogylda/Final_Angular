import { Component } from '@angular/core';
import {LanguageHeaders, LanguageData} from "./language.interface"
 
@Component({
    selector: 'languages',
    templateUrl: 'languages.component.html'
    // styleUrls: ['home.component.css']
})

export class LanguagesComponent{ 

    languageHeaders:LanguageHeaders = {
        language: "Language",
        written: "Written",
        spoken: "Spoken"
    }

    languageData:LanguageData[] = [
        {language: "English", written: "Upper-intermediate", spoken: "Advanced"},
        {language: "German", written: "Beginning", spoken: "Beginning"}
    ];

}
