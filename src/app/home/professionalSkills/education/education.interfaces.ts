export abstract class Educations {
    institution:any;
    dateAttended:any;
    qualification:any;
}

export abstract class EducationsHeaders implements Educations{
    institution:string;
    dateAttended:string;
    qualification:string;
}

export abstract class EducationsData implements Educations {
    institution:string;
    dateAttended:string;
    qualification:string;
}

