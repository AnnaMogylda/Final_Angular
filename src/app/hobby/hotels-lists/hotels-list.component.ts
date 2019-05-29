import { Component, OnInit } from "@angular/core";
import {Filters} from "../shared/filters";
import {HotelItem} from "../shared/hotel";
import {HotelsService} from "../shared/hotels-list.service";
import { Router } from "@angular/router";


@Component({
    selector: 'hotels',
    templateUrl: 'hotels-list.component.html',
    styleUrls: ['hotels-list.component.css']
})

export class HotelListComponent implements OnInit{
//consts
MILLISECONDS_TO_DAYS:number=86400000;
// MAX_BOOK_PERIOD: number = 21;

//html elements
select:string = "Select";
message:string = "";
showHotelsList:boolean = true;
calculatebasePrice:Function;

//Services
hotelsList:HotelItem[];
filteredData:HotelItem[];
filters:Filters;

// Data to initialize filters form Service
hotelsNamesList:string[];
countriesList:string[];
ratingList:number[];
guestsList:number[];
pricesList:number[];
periodsList:number[];
datesList:any;
additionalServices:string[];

//Date filters
daysSelected:number=1;

constructor(private HotelsService:HotelsService, private router:Router){}

ngOnInit(){
    this.HotelsService
    .showFilters()
    .then(result => {this.filters = result, 
        this.hotelsNamesList=this.filters.names;
        this.countriesList = this.filters.countries, 
        this.ratingList = this.filters.rating,
        this.guestsList = this.filters.guests;
        this.pricesList = this.filters.priceForRoom;
        this.datesList = this.filters.datesOfStay;
        this.additionalServices = this.filters.additionalServices;
    });
    this.HotelsService
    .showHotelsList()
    .then(result => {this.hotelsList = result, 
        this.showHotelsList = true;
        //calculate minPrice per Hotel
        this.calculatebasePrice = () =>{
            let arr:number[]=[];
            for(let key in this.hotelsList){
                for(let item in this.hotelsList[key].pricesPerRoom){
                    arr.push(this.hotelsList[key].pricesPerRoom[item]);
                }
                this.hotelsList[key].basePrice = Math.min.apply(null, arr);
            }
        };
        this.calculatebasePrice();
    });
    this.showHotelsList = true;

    
  
}

public goToAdminPage() {
    this.router.navigate(["/hobby","admin"]);
}

public goToEditPage() {
    this.router.navigate(["/hobby", "edit"]);
}

public onSelect(nameSelected, countrySelected, ratingSelected, guestsSelected, fromPriceSelected, toPriceSelected, dateFrom, dateTo, servicesSelected){
    this.message=""; 
    //Filters
    let filtersCheck:Function;
    let filteredHotelName:Function;
    let filteredCountry:Function;
    let filteredRating:Function;
    let filteredGuests:Function;
    let filteredPrice:Function;
    let filterDates:Function;
    let filteredServices:Function;
    //Date
    let currentDate:Date = new Date();
    let currentTime:number= currentDate.getTime(); 
    let period:number;

    this.filteredData = this.hotelsList.slice();
    console.log(nameSelected, countrySelected, ratingSelected, guestsSelected, fromPriceSelected, toPriceSelected, dateFrom, dateTo, servicesSelected);
    //If all filters have "Select" field is selected then no filter to be applied and so the whole table to be shown
    filtersCheck = (nameSelected, countrySelected, ratingSelected, guestsSelected, fromPriceSelected, toPriceSelected, dateFrom, dateTo, servicesSelected)=>{
        if ((this.select == nameSelected) && (this.select == countrySelected) && (this.select == ratingSelected) && (this.select == guestsSelected) && 
            (this.select == fromPriceSelected) && (this.select == toPriceSelected) && (this.select == dateFrom) && (this.select == dateTo) &&(this.select == servicesSelected)){
            // console.log("show All");
            this.showHotelsList=true;
            return  false
        } else{
            return true
        }
    }

    //getDate
    let getDate = (dateToCheck) => {
        console.log(dateToCheck);
        let date = new Date(dateToCheck);
        let time = date.getTime();
        console.log(time);
        return time;
    }

    //check date validity
    let checkDateWitCurrDate = (dateToCheck) => {
        let time = getDate(dateToCheck);
        // console.log(time);
        //if date is not selected
        if(!time)  return NaN
        //if date selected is less than today
        else if(time + 99999999 < currentTime) return false
        //if date is valid
        else return true
    }

    let checkDatesSelected = (dateFrom, dateTo) => {
        let fromDate = getDate(dateFrom);
        let toDate = getDate(dateTo);
           if(fromDate > toDate) {
            this.message= "Date To cannot be less than Date From";
            return false;
           } else{
               return true;
           }
    }

    let calculatePeriod = (dateFrom, dateTo) => {
        let fromDate = getDate(dateFrom);
        let toDate = getDate(dateTo);
        let period = (toDate- fromDate) / this.MILLISECONDS_TO_DAYS;
        for(let key in this.filteredData){
            this.filteredData[key].daysOfStay = period;
        }
        return period;
    }

    let calculateCostOfStay = (guestsSelected, period) => {
        if(!guestsSelected || guestsSelected==this.select) {
            return this.filteredData;
        }
        else{
            for(let key in this.filteredData){
                this.filteredData[key].basePrice = period*this.filteredData[key].pricesPerRoom[guestsSelected];
            }
            return this.filteredData;
        }
    };

    let validateData = (dateFrom, dateTo) => {
        let dateValidationFrom = checkDateWitCurrDate(dateFrom);
        let dateValidationTo = checkDateWitCurrDate(dateTo);
        console.log(dateValidationFrom);
        
        if((dateValidationFrom==NaN)&&(dateValidationTo==NaN)){return false}
        if((dateValidationFrom==false)&&(dateValidationTo==false)) {this.message= "Invalid DateFrom and DateTo"; return false }
        else if(dateValidationFrom==false){ this.message= "Invalid DateFrom"; return false }
        else if(dateValidationTo==false){ this.message= "Invalid DateTo"; return false }
        else{return true}
    }

    //Hotel name list
    filteredHotelName= (nameSelected) => {       
        if (this.select == nameSelected || !nameSelected){
            console.log("Select: Hotel Name");
            return  this.filteredData;
        }
        for(let i=0; i<this.filteredData.length;i++){
            if(nameSelected==this.filteredData[i].name){
                this.filteredData = this.filteredData.filter(hotel => hotel.name === nameSelected);
                this.showHotelsList=false;
                console.log(this.filteredData);
                return this.filteredData;
            } 
        }       
    }

    //Country filter
    filteredCountry= (countrySelected) => {       
        if (this.select == countrySelected || !countrySelected){
            // console.log("Select: Country");
            return  this.filteredData;
        }
        this.filteredData = this.filteredData.filter(hotel => hotel.country === countrySelected);
        this.showHotelsList=false;
        console.log(this.filteredData);
        return this.filteredData;
    }
  
    // //Rating filter
    filteredRating = (ratingSelected) => {     
        if (this.select == ratingSelected || !ratingSelected){
            // console.log("Select: Rating");
            return  this.filteredData;
        }
        this.filteredData = this.filteredData.filter(hotel => hotel.rating === +ratingSelected);
        this.showHotelsList=false;
        console.log(this.filteredData);
        return this.filteredData;         
    }

    //Services filter
    filteredServices= (servicesSelected) => {       
        if (this.select == servicesSelected || !servicesSelected){
            // console.log("Select: Services");
            this.showHotelsList=false;
            return  this.filteredData;
        }
        this.filteredData = this.filteredData.filter(hotel=> {
            if(hotel.additionalServices){
                // console.log(hotel.additionalServices);
                for(let j=0; j<hotel.additionalServices.length;j++){
                    if(servicesSelected==hotel.additionalServices[j]){
                        // console.log(servicesSelected);
                        return hotel;
                    }
                }
            }
        });
        this.showHotelsList=false;
    }

    //Guests filter
    filteredGuests = (guestsSelected, period, dateFrom, dateTo ) => {       
        if (this.select == guestsSelected || !guestsSelected){
            this.calculatebasePrice();
            // console.log("Select: Guests");
            return  this.filteredData;
        }

        let validatedDate = validateData(dateFrom, dateTo);
        console.log(validatedDate);
        if(!validatedDate){return false}
      
        this.filteredData = this.filteredData.filter(hotel => {
            for (let key in hotel.pricesPerRoom){
                if (+key === +guestsSelected){
                    if(period){
                        hotel.basePrice = period*hotel.pricesPerRoom[key];
                    } else{
                        hotel.basePrice = hotel.pricesPerRoom[key];
                    }
                    this.message="";
                    return hotel;
                }  
            }
        }); 
        this.showHotelsList=false;
        console.log(this.filteredData);     
    }
    
    filterDates = (dateFrom, dateTo, guestsSelected) => {
        let validatedDate = validateData(dateFrom, dateTo);
        console.log(validatedDate);
            if(validatedDate){
                let validDate = checkDatesSelected(dateFrom, dateTo);
                console.log(validDate);
                if(validDate){
                    period = calculatePeriod(dateFrom, dateTo);
                    console.log(period);
                   if(period && guestsSelected){
                        calculateCostOfStay(guestsSelected, period);
                        return this.filteredData;
                    } else if(period && (!guestsSelected || guestsSelected==this.select)) {
                        this.message= "Please choose the number of guests to display appropriate prices";
                        return this.filteredData;
                    } else{
                        for(let key of this.filteredData){
                            key.daysOfStay = 1;
                        }
                    }
                }
            }          
        }
        // validateData(dateFrom, dateTo);


    //Price filter
    filteredPrice = (fromPriceSelected, toPriceSelected, guestsSelected, period) => {    
        //If no guests are seleted by user
        let getHotelsPricesNoGuests = (fromPriceSelected, toPriceSelected) => {
            let arrayBoolean:boolean[]= [];
            for(let i=0; i<this.filteredData.length;i++){
                // console.log(this.filteredData[i].pricesPerRoom);
                let temp:any = this.filteredData[i].pricesPerRoom;
                let arrayOfPrices:number[] =[];
                for(let key in temp){
                    arrayOfPrices.push(temp[key]);
                }
                console.log(arrayOfPrices);
                if(fromPriceSelected){
                    arrayBoolean.push(arrayOfPrices.some(value => value >= +fromPriceSelected));
                }
                if(toPriceSelected){
                    arrayBoolean.push(arrayOfPrices.some(value => value <= +toPriceSelected));
                } 
            }
            let hotelsWithinPriceLimits:HotelItem[] = [];
            for(let j=0; j<this.filteredData.length; j++){
                if(arrayBoolean[j]){
                    hotelsWithinPriceLimits.push(this.filteredData[j]);
                }
            }
            console.log(hotelsWithinPriceLimits);
            return hotelsWithinPriceLimits;
        }              
        
        //1.If no guests are selected, then filter by Price filters "From" and "To" only
        //2. If number of guest is selected, then filter"From" and "To" should be done depending on number of guests
        if ((this.select == fromPriceSelected || !fromPriceSelected) && (this.select == toPriceSelected || !toPriceSelected)){
            console.log("Select: Price");
            return  this.filteredData;
        } 
        //To filter Hotels if ONLY "From" date is selected:
        else if ((fromPriceSelected || (this.select != fromPriceSelected))  && (this.select == toPriceSelected || !toPriceSelected)){
            this.filteredData=this.filteredData.filter(hotel  =>{
                if(hotel.basePrice >= +fromPriceSelected){
                    return hotel;
                }
            });
        }
        //To filter Hotels if ONLY "To" date is selected:
        else if ((toPriceSelected || (this.select != toPriceSelected)) && (this.select == fromPriceSelected || !fromPriceSelected)){
            this.filteredData=this.filteredData.filter(hotel  =>{
                if(hotel.basePrice <= +toPriceSelected){
                    return hotel;
                }
            });
        }       
        //To filter Hotels with both "From" and "To" selected
        else {
             //switch prices, if fromPriceSelected > toPriceSelected
            if (+fromPriceSelected > +toPriceSelected){
                let temp = fromPriceSelected;
                fromPriceSelected = toPriceSelected;
                toPriceSelected = temp;
                // console.log(fromPriceSelected, toPriceSelected);
            }
            //Number of guests is not defined
            if (this.select == guestsSelected || !guestsSelected){            
                let hotelsWithinPriceLimits1= getHotelsPricesNoGuests(fromPriceSelected, null);
                this.filteredData=this.filteredData.filter(function(e){return this.indexOf(e)>=0;},hotelsWithinPriceLimits1);
                let hotelsWithinPriceLimits2= getHotelsPricesNoGuests(null, toPriceSelected);
                this.filteredData=this.filteredData.filter(function(e){return this.indexOf(e)>=0;},hotelsWithinPriceLimits2);
                this.showHotelsList=false;
                // console.log(this.filteredData);
                return this.filteredData;
            //Number of guests is defined
            } else {
                this.filteredData=this.filteredData.filter(hotel  =>{
                    if((hotel.basePrice >= +fromPriceSelected) && (hotel.basePrice <= +toPriceSelected)){
                        return hotel;
                    }
                });
            } 
        } 
    }

    let checkFilters = filtersCheck(nameSelected, countrySelected, ratingSelected, guestsSelected, fromPriceSelected, toPriceSelected, dateFrom, dateTo, servicesSelected);
        if(!checkFilters){
            return false;
        }
    filteredHotelName(nameSelected);
    filteredCountry(countrySelected);
    filteredRating(ratingSelected); 
    filteredServices(servicesSelected);
    filterDates(dateFrom, dateTo);
    filteredGuests(guestsSelected, period, dateFrom, dateTo);
    filteredPrice(fromPriceSelected, toPriceSelected, guestsSelected, period);
       
   
}

ngOnDestroy(){
    this.filteredData = [];
    
}
}


                

