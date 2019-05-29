export abstract class Certificates {
    category:any;
    grade:any
}

export abstract class CertificatesHeaders implements Certificates{
    category:string;
    grade:string
}

export abstract class CertificatesData implements Certificates {
    category:string;
    grade:string
}

