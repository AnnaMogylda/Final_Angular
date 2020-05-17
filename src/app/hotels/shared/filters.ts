export class Filters {
    constructor(
        public countries:string[],
        public names:string[],
        public rating:number[],
        public guests:number[],
        public priceForRoom:number[],
        public datesOfStay:any,
        public additionalServices?:string[]
        ){}
}