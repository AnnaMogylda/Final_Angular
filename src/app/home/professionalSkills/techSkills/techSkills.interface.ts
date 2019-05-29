export abstract class TechSkills {
    category:any;
    list:any;
}

export abstract class TechSkillsHeaders implements TechSkills{
    category:string;
    list:string;
}

export abstract class TechSkillsData implements TechSkills {
    category:string;
    list:string;
}

