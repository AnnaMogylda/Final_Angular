
import {HotelItem} from "./hotel";
import {Filters} from "./filters";
import {Injectable} from "@angular/core";

let countries:string[]=  ["China", "Austria", "France"];
let names: string[] = ["Royal Plaza Hotel",  "Nathan Hotel",  "Best Western Hotel Astrid",  "Hotel Cafe Miramar",   "Hotel Darcet"];
let rating:number[] = [];
for(let i=1; i<=5; i++){ rating.push(i);}
let guests:number[] = [];
for(let i=1; i<=6; i++){ guests.push(i);}
let  priceForRoom: number[] =[];
for(let i=100; i<=10000; i+=100){
    if(i<=1000)priceForRoom.push(i)
    else if(i>1000 && i<=3000){priceForRoom.push(i+=200)}
    else priceForRoom.push(i+=500)
}
let daysOfStay:number=1;
let basePrice:number=0;
let additionalServices:string[] = ["SPA", "golf", "transfer", "car rent", "excursions", "driver"];

let filters:Filters = {
    countries,
    names,
    rating,
    guests,
    priceForRoom,
    datesOfStay : ["Days"],
    additionalServices
};



let hotelsLists: HotelItem[] = [
    new HotelItem(countries[0], 
    names[0],
    "https://media-cdn.tripadvisor.com/media/photo-s/0b/69/ec/9e/domidea-hotel.jpg",
    rating[4],
    basePrice,
    {
        2: 300,
        3: 400,
        4: 500,
        5: 600
    },
    daysOfStay,
    additionalServices),
    new HotelItem(countries[0], 
    names[1],
     "https://media-cdn.tripadvisor.com/media/photo-f/12/fa/aa/25/getlstd-property-photo.jpg",
    rating[2],
    basePrice,
    {
        2: 200,
        3: 300,
        4: 400
    },
    daysOfStay),
    new HotelItem(countries[1], 
    names[2],
     "https://media-cdn.tripadvisor.com/media/photo-s/13/68/c8/07/exterior.jpg",
    rating[4],
    basePrice,
    {
        1: 300,
        2: 400,
        3: 500,
        4: 600
    },
    daysOfStay,
    [additionalServices[0], additionalServices[2], additionalServices[3], additionalServices[5]]),
    new HotelItem( countries[1], 
    names[3],
     "https://media-cdn.tripadvisor.com/media/oyster/600/0b/41/2a/b0/triple-room--v11463351.jpg",
    rating[2],
    basePrice,
    {
        2: 200,
        3: 300,
    },
    daysOfStay),
    new HotelItem(countries[2], 
    names[4],
     "https://media-cdn.tripadvisor.com/media/photo-s/11/16/d9/c6/chambre-vue-mer-avec.jpg",
    rating[3],
    basePrice,
    {
        2: 300,
        3: 500,
        4: 700,
        5: 900
    },
    daysOfStay)
]

let filtersPromise = Promise.resolve(filters);
let hotelsPromise = Promise.resolve(hotelsLists);

@Injectable()
export class HotelsService{
    showFilters():Promise<Filters>{
        return filtersPromise;
    }
    showHotelsList():Promise<HotelItem[]>{
        return hotelsPromise
    }
}








    
   
    
   