export abstract class ForeignLanguage {
    language:any;
    written:any;
    spoken:any;
}

export abstract class LanguageHeaders implements ForeignLanguage{
    language:string;
    written:string;
    spoken:string;
}

export abstract class LanguageData implements ForeignLanguage {
    language:string;
    written:string;
    spoken:string;
}

