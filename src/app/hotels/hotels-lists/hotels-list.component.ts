import { Component, OnInit} from "@angular/core";
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

//html elements
select:string = "Select";
message:string = "";
closeSrc:string = "assets/img/times-circle-solid.png";
showMessage:boolean = false;
formattingGuest:boolean = true;
formattingDateFrom:boolean = true;
formattingDateTo:boolean = true;
formattingPriceFrom:boolean = true;
formattingPriceTo:boolean = true;
showHotelsList:boolean = true;
calculatebasePrice:Function;
calculateRating:Function;

//Services
hotelsList:HotelItem[];
filteredData:HotelItem[];
filters:Filters;

//adding info
ratingImgs:Array<any> = new Array(5);
ratingStars:Array<any> = [];
ratesArr:Array<number> = [];

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
spa:string="";

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
                //calculating base price
            for(let key in this.hotelsList){
            let arr:number[]=[];
                for(let item in this.hotelsList[key].pricesPerRoom){
                    arr.push(this.hotelsList[key].pricesPerRoom[item]);
                }
                this.hotelsList[key].basePrice = Math.min.apply(null, arr);
                console.log(arr);
            }    
        };
        this.calculateRating = () => {
             //getting rating from service
             for(let key in this.hotelsList){
                this.ratesArr.push(this.hotelsList[key].rating);
            }
            console.log(this.ratesArr);
            this.ratingStars = this.ratesArr.map(data => {
              let temp=[];
              for(let i=0; i<this.ratingImgs.length; i++){
                if(Number.isInteger(data)){
                  if(i<data){
                    temp.push('assets/img/star-solid.svg');
                  } else{
                    temp.push('assets/img/star-regular.svg');
                  }
                }else{
                  if((i+0.5)<data){
                    temp.push('assets/img/star-solid.svg');
                  } else if ((i+0.5)==data) {
                    temp.push('assets/img/star-half-alt-solid.svg');
                  } else{
                    temp.push('assets/img/star-regular.svg');
                  }
                }
              } 
              return temp;
            });
            //adding data
            console.log(this.ratingStars);
            for(let i in this.hotelsList){
                for(let j in this.ratingStars){
                  if(i == j){
                    this.hotelsList[i].starsIcons = this.ratingStars[j];
                  }
                }
            };
            console.log(this.hotelsList);
        }
        this.calculatebasePrice();
        this.calculateRating();
        
    });      
}


public goToAdminPage() {
    this.router.navigate(["/hotels","admin"]);
}

public goToEditPage() {
    this.router.navigate(["/hotels", "edit"]);
}

public hideMessage(){
    this.showMessage = false;
}

public onSelect(nameSelected, countrySelected, ratingSelected, guestsSelected, fromPriceSelected, toPriceSelected, dateFrom, dateTo, servicesSelected){
    this.message=""; 
    this.showMessage = false;
    //Filters
    let validateDate:Function;
    let filtersCheck:Function;
    let filteredHotelName:Function;
    let filteredCountry:Function;
    let filteredRating:Function;
    let filteredPrice:Function;    
    let filteredServices:Function;
    //Date
    let period:number;

    this.filteredData = this.hotelsList.slice();

    let resetHotelsList = () => {
        for(let key in this.hotelsList){
            let arr:number[]=[];
                for(let item in this.hotelsList[key].pricesPerRoom){
                    arr.push(this.hotelsList[key].pricesPerRoom[item]);
                }
                this.hotelsList[key].basePrice = Math.min.apply(null, arr);
                console.log(arr);
            }    
        this.showHotelsList=true;
    }

    let resetHtmlFormat = () => {
        this.message = "";
        this.showMessage = false;
        this.formattingGuest = true;
        this.formattingDateFrom = true;
        this.formattingDateTo = true;
        this.formattingPriceFrom = true;
        this.formattingPriceTo = true;
    }

    console.log(nameSelected, countrySelected, ratingSelected, guestsSelected, fromPriceSelected, toPriceSelected, dateFrom, dateTo, servicesSelected);
    //If all filters have "Select" field is selected then no filter to be applied and so the whole table to be shown
    filtersCheck = (nameSelected, countrySelected, ratingSelected, guestsSelected, fromPriceSelected, toPriceSelected, dateFrom, dateTo, servicesSelected)=>{
        if ( 
            ( (this.select == nameSelected) || (nameSelected ==undefined ) ) &&
            ( (this.select == countrySelected) || (countrySelected == undefined) ) &&
            ( (this.select == ratingSelected) || (ratingSelected == undefined) ) && 
            ( (this.select == guestsSelected) || (guestsSelected == undefined) ) && 
            ( (this.select == fromPriceSelected) || (fromPriceSelected == undefined) ) && 
            ( (this.select == toPriceSelected) || (toPriceSelected == undefined) )&& 
            ( (this.select == dateFrom) || (dateFrom == undefined) ) && 
            ( (this.select == dateTo) || (dateTo == undefined) ) &&
            ( (this.select == servicesSelected) || servicesSelected == undefined)) {
            console.log("show All");
            this.showHotelsList=true;
            return  false
        }else{
            this.showHotelsList=false;
            return true
        }
    }


    //check date validity
    let checkDateWitCurrDate = (dateToCheck) => {
        //if date is not selected
        if(!dateToCheck)  return NaN;
        const dateToCheckArr = dateToCheck.split("-");
        const [selYear, selMonth, selDay] = dateToCheckArr;
        const currentFullDate = new Date();
        const pattern = /(\w+) (\w+) (\d+) (\d+) (\d+):(\d+):(\d+) (\w+)\+(\d+) \((\w+) (\w+) (\w+) (\w+)\)/i;
        let currentDate = currentFullDate.toString().replace(pattern, '$4 $2 $3').split(' ');
        const Months = {
            "Jan": "01",
            "Feb": "02",
            "Mar": "03",
            "Apr": "04",
            "May": "05",
            "Jun": "06",
            "Jul": "07",
            "Aug": "08",
            "Sep": "09",
            "Oct": "10",
            "Nov": "11",
            "Dec": "12"
        }
        //Change name of Month to number
        for(let key in Months){
            if (key == currentDate[1]) {currentDate[1]=Months[key]}                 
        }
        //if date selected is less than today, return false, else return true
        if(+selYear > +currentDate[0]){
            return true
        }else if(+selYear == +currentDate[0]){
            if(+selMonth > +currentDate[1]){
                return true
            }else if (+selMonth == +currentDate[1]){
                if(+selDay >= +currentDate[2]){
                    return true
                }else return false
            } return false   
        } else return false
    }

    validateDate = (dateFrom, dateTo) => {
        //if no date selected by user, no actions requered
        if((!dateFrom || dateFrom=="")&&(!dateTo || dateTo=="")){
            return  true
        }
    
        console.log(dateFrom);
        //to check if date is valid
        const dateValidationFrom = checkDateWitCurrDate(dateFrom);
        const dateValidationTo = checkDateWitCurrDate(dateTo);
        console.log(dateValidationFrom);

    
        //if invalid DateFrom and DateTo are selected    
        if((dateValidationFrom==false)&&(dateValidationTo==false)){
            this.message= "Incorrectly chosen dates";
            this.showMessage = true;
            this.formattingDateFrom=false;
            this.formattingDateTo=false;
            return false 
        }
        //if invalid DateFrom is selected  
        else if(dateValidationFrom==false){ 
            //and DateTo is not selected selected  
            if(dateTo==undefined || dateTo=="") {
                this.message= "Incorrect date of arrival. Please select date of leaving"; 
                this.showMessage = true;
                this.formattingDateFrom=false;
                this.formattingDateTo=false;
                return false 
            }
            this.formattingDateFrom=false;
            this.message= "Invalid DateFrom";
            this.showMessage = true;
            return false 
        }
        //if invalid DateTo is selected  
        else if(dateValidationTo==false){ 
            //and Date is not selected selected  
            if(!dateFrom || dateFrom=="")
                { this.message= "Incorrect date of leaving. Please select date of arrival";
                this.showMessage = true;
                this.formattingDateFrom=false;
                this.formattingDateTo=false;
                return false 
            }
            this.message= "Invalid DateTo";
            this.showMessage = true;
            this.formattingDateTo=false;
            return false 
        }
          //if DateFrom is not selected, but DateTo is selected
          else if(!dateFrom || dateFrom==""){
            this.message= "Please select date of arrival";
            this.showMessage = true;
            this.formattingDateFrom=false;
            return false 
        }
         //if DateFrom is selected, but DateTo is not selected
        else if(dateTo==undefined || dateTo==""){
            this.message= "Please select date of leaving"; 
            this.showMessage = true;
            this.formattingDateTo=false;
            return false 
        }
        else{
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

    let checkDatesSelected = (dateFrom, dateTo) => {
        let fromDate = getDate(dateFrom);
        let toDate = getDate(dateTo);
           if(fromDate >= toDate) {
            return false;
           } else{
               return true;
           }
    }

    let calculatePeriod = (dateFrom, dateTo) => {
        const fromDate = getDate(dateFrom);
        const toDate = getDate(dateTo);
        const period = (toDate- fromDate) / this.MILLISECONDS_TO_DAYS;
        for(let key in this.filteredData){
            this.filteredData[key].daysOfStay = period;
        }
        return period;
    }

    let calculateCostOfStay = (guestsSelected, period) => {
        this.filteredData.map(hotel => {
            for(let key in hotel.pricesPerRoom){
                console.log(key, guestsSelected)
                if(key==guestsSelected){
                    hotel.basePrice = period*hotel.pricesPerRoom[guestsSelected];
                } 
            }
            return hotel
        });
        return this.filteredData;
    };

    let checkPrices = (fromPriceSelected, toPriceSelected) => {
        if(+fromPriceSelected > +toPriceSelected){
            console.log(fromPriceSelected,toPriceSelected);
            this.message= "Incorrectly chosen prices per days"; 
            this.showMessage = true;
            this.formattingPriceFrom = false;
            this.formattingPriceTo=false;
            resetHotelsList();
            return  this.hotelsList;
        }
    }

    
    //check guest
    let checkGuestInHotel = (guestsSelected) => {
        this.filteredData = this.filteredData.filter(hotel => {
            for(let key in hotel.pricesPerRoom){
               if (+key === +guestsSelected){
                    return hotel                              
               }
            }
        });
    return this.filteredData;
    }

    
    //Hotel name list
    filteredHotelName= (nameSelected) => {       
        if (this.select == nameSelected || !nameSelected){
            // console.log("Select: Hotel Name");
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
    
    //Price filter
    filteredPrice = (fromPriceSelected, toPriceSelected, guestsSelected, dateFrom, dateTo) => { 
        checkPrices(fromPriceSelected, toPriceSelected);
    
        if(dateFrom && dateTo){
            let validDate = checkDatesSelected(dateFrom, dateTo);
            console.log(validDate);
            //if DateTo is less then or equals DateFrom
            if(!validDate) {
                this.message= "Date of leaving should be at least one day more than date of arrival";
                this.showMessage = true;
                this.formattingDateFrom=false;
                this.formattingDateTo=false;
                return false
            }
            period = calculatePeriod(dateFrom, dateTo);
            console.log(period);
        } else{
            this.filteredData.forEach( elem => {
                elem.daysOfStay = 1;
            })
        }
        
        //nothing is selected
        if ( 
            (!guestsSelected || guestsSelected==this.select) &&
            (!dateFrom || dateFrom=="")&&(!dateTo || dateTo=="") &&
            (this.select == fromPriceSelected || !fromPriceSelected) &&
            (this.select == toPriceSelected || !toPriceSelected) ) {
                return  this.filteredData
        } else if(
            //guest is not selected
            //only priceFrom is selected - no guest, no days, no priceTo 
            //only priceTo is selected - no guest, no days, no priceFrom
            //priceFrom and  priceTo are selected - no guest, no days
            (!guestsSelected || guestsSelected==this.select)) {
                this.message= "Please choose the number of guests to display appropriate prices";
                this.showMessage = true;
                resetHotelsList();
                this.formattingGuest=false;
                this.showHotelsList=true;
                console.log(this.hotelsList);
                return  this.hotelsList
        //only guest is selected - no days, no priceFrom, no priceTo
        } else if(
            (!dateFrom || dateFrom=="")&&(!dateTo || dateTo=="") &&
            (this.select == fromPriceSelected || !fromPriceSelected) &&
            (this.select == toPriceSelected || !toPriceSelected) &&
            guestsSelected){
                this.filteredData = this.filteredData.filter(hotel => {
                    for(let key in hotel.pricesPerRoom){
                       if (+key === +guestsSelected){
                        hotel.basePrice = hotel.pricesPerRoom[key];
                            return hotel                              
                       }
                    }
                });
            this.showHotelsList=false;
            return this.filteredData;
        //guest, priceFrom is selected  - no days, no priceTo
        } else if(
            (!dateFrom || dateFrom=="")&&(!dateTo || dateTo=="") &&
            (this.select == toPriceSelected || !toPriceSelected) &&
            guestsSelected && fromPriceSelected){
                this.filteredData=this.filteredData.filter(hotel  =>{
                     for(let key in hotel.pricesPerRoom){
                        if(key==guestsSelected){
                           hotel.basePrice = hotel.pricesPerRoom[key];
                           if(fromPriceSelected <= hotel.basePrice){
                            return hotel;
                           }
                        }
                     }
                });
                return  this.filteredData
        //guest, priceTo is selected - no days, no priceFrom
        }else if(
            (!dateFrom || dateFrom=="")&&(!dateTo || dateTo=="") &&
            (this.select == fromPriceSelected || !fromPriceSelected) &&
            guestsSelected && toPriceSelected){
                this.filteredData=this.filteredData.filter(hotel  =>{
                     for(let key in hotel.pricesPerRoom){
                        if(key==guestsSelected){
                           hotel.basePrice = hotel.pricesPerRoom[key];
                           if(toPriceSelected >= hotel.basePrice){
                            return hotel;
                           }
                        }
                     }
                });
            return  this.filteredData
        //guest, priceFrom and priceTo is selected - no days
        }else if(
            (!dateFrom || dateFrom=="")&&(!dateTo || dateTo=="") &&
            guestsSelected && toPriceSelected && fromPriceSelected){
                this.filteredData=this.filteredData.filter(hotel  =>{
                     for(let key in hotel.pricesPerRoom){
                        if(key ==guestsSelected){
                           hotel.basePrice = hotel.pricesPerRoom[key];
                           if(fromPriceSelected <= hotel.basePrice && toPriceSelected >= hotel.basePrice){
                            return hotel;
                           }
                        }
                     }
                });
            return  this.filteredData
        // if days are selected - no guests,no priceFrom, no priceTo
        }else if ( 
           (!guestsSelected || guestsSelected==this.select) &&
           (this.select == fromPriceSelected || !fromPriceSelected) &&
           (this.select == toPriceSelected || !toPriceSelected) &&
           dateFrom  && dateTo) {
                this.message= "Please choose the number of guests to display prices";
                this.showMessage = true;
                resetHotelsList();
                this.formattingGuest=false;
                this.showHotelsList=true;
                console.log(this.hotelsList);
                return  this.hotelsList
        //guests and days are selected - no priceFrom, no priceTo
        }else if(
            (this.select == fromPriceSelected || !fromPriceSelected) &&
            (this.select == toPriceSelected || !toPriceSelected) &&
            guestsSelected && dateFrom && dateTo){
                this.filteredData = checkGuestInHotel(guestsSelected);
                this.filteredData = calculateCostOfStay(guestsSelected, period);
                this.showHotelsList=false;
                console.log(this.filteredData);
                return  this.filteredData
        //guests, days, priceFrom are selected- no priceTo
        }else if(
            (this.select == toPriceSelected || !toPriceSelected) &&
            guestsSelected && fromPriceSelected && dateFrom && dateTo){
                this.filteredData = calculateCostOfStay(guestsSelected, period);
                this.filteredData=this.filteredData.filter(hotel  =>{
                         for(let key in hotel.pricesPerRoom){
                            if(key== guestsSelected){
                               if(fromPriceSelected <= hotel.basePrice){
                                return hotel;
                               }
                            }
                         }
                    });
                return  this.filteredData
        }else if(
            (this.select == fromPriceSelected || !fromPriceSelected) &&
            guestsSelected && toPriceSelected && dateFrom && dateTo){
                this.filteredData=this.filteredData.filter(hotel  =>{
                     for(let key in hotel.pricesPerRoom){
                        if(key== guestsSelected){
                           if(toPriceSelected >= hotel.basePrice){
                            return hotel;
                           }
                        }
                     }
                });
                return  this.filteredData
        //all filter are selected - guests, days, priceTo, priceFrom are selected
        }else{
            this.filteredData = calculateCostOfStay(guestsSelected, period);
            this.filteredData=this.filteredData.filter(hotel  =>{
                     for(let key in hotel.pricesPerRoom){
                        if(key== guestsSelected){
                           if(fromPriceSelected <= hotel.basePrice && toPriceSelected >= hotel.basePrice){
                            return hotel;
                           }
                        }
                     }
                });
                return  this.filteredData
        }
    }

    resetHtmlFormat();
    let validatedDate = validateDate(dateFrom, dateTo);
        //if date is not valid, show hotelsList, no filtering date
        if(!validatedDate){
            resetHotelsList();
            return false;
        }
    let checkFilters = filtersCheck(nameSelected, countrySelected, ratingSelected, guestsSelected, fromPriceSelected, toPriceSelected, dateFrom, dateTo, servicesSelected);
        if(!checkFilters){
            resetHotelsList();
            // this.sadSmile = "assets/img/frown-open-regular.svg" ; 
            this.message = "All hotels are displayed. No filter is applied";
            this.showMessage = true;
            return false;
        }
 
    
    filteredHotelName(nameSelected);
    filteredCountry(countrySelected);
    filteredRating(ratingSelected); 
    filteredServices(servicesSelected);
    filteredPrice(fromPriceSelected, toPriceSelected, guestsSelected, dateFrom, dateTo);
    if (this.filteredData.length == 0) {
        this.message = "No hotels with specified criteria were found";
        this.showMessage = true;
        resetHotelsList();
    }

  
    
   
}

// submit() {
//     console.log(this.form.value.name);
   
// }

ngOnDestroy(){
    this.filteredData = [];
    
}
}


                

