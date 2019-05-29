import { Component } from '@angular/core';
import {CertificatesData, CertificatesHeaders } from "./certificates.interfaces";


@Component({
    selector: 'certificates',
    templateUrl: 'certificates.component.html'
    // styleUrls: ['home.component.css']
})

export class CertificatesComponent{ 
    
    certificatesHeaders:CertificatesHeaders = {
        category: "Certification Category",
        grade: "Certification Grade/Remarks",
    }

    certificatesData: CertificatesData[] = [
        {category: "HTML5&CSS3 Starter", grade: "1000/1000, Cyberbionic systematics"},
        {category: "JavaScript Essential", grade: "960/1000, Cyberbionic systematics"},
        {category: "Twitter Bootstrap 4", grade: "1000/1000, Cyberbionic systematics"},
        {category: "JavaScript Advanced", grade: "950/1000, Cyberbionic systematics"},
        {category: "HTML5&CSS3 Advanced", grade: "966/1000, Cyberbionic systematics"},
        {category: "TypeScript Fundamentals", grade: "1000/1000, Cyberbionic systematics"}
    ];
}
