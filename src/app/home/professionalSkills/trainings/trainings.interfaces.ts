export abstract class Training {
    name:string;
    dateEnded:any;
    status:string;
    provider:string;
    description:string;
}

export abstract class TrainingHeaders implements Training{
    name:string;
    dateEnded:string;
    status:string;
    provider:string;
    description:string;
}

export abstract class TrainingData implements Training {
    name:string;
    dateEnded:string;
    status:string;
    provider:string;
    description:string;
}
