export class HotelItem {
    constructor(
        public country: string,
        public name: string,
        public img:string,
        public rating:number,
        public basePrice:number,
        public pricesPerRoom:any,
        public daysOfStay: number,
        public additionalServices?:string[],
        public id?:string
    )
    {}
}
    

