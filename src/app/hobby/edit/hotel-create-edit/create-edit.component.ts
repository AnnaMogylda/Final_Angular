import { Component, OnInit } from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { HotelItem } from '../../shared/hotel';
import { HotelsListFullService } from '../../shared/hotels-lists-full.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { lettersValidator} from "../../shared/custom-validators";

@Component({
    selector: 'create-edit',
    templateUrl: 'create-edit.component.html',
    styleUrls: ['create-edit.component.css']
})

export class CreateEditListComponent implements OnInit{
    newHotel: HotelItem;
    errorMessage: string;
    hotelForm:FormGroup;
    rating:number[] = [1,2,3,4,5];
    guests:number[] = []; 
    prices:number[] = [];
    tableOfPrices:Array<number[]> =[];
    tableOfOldPrices:Array<number[]> =[];
    showPrices:boolean = true;
    showOldPrices:boolean = false;
    oldBasePrice:number;
    oldPricesPerRoom:any = {};
    pricesPerRoom:any = {};
    basePrice:number = 0;
    guestsList: number[]  = [1,2,3,4,5,6];
    existingGuest:boolean=false;
    curGuest: number;
    curRating:number;
    additionalServices:string;

    formErrors = {
        "name": "",
        "age": "",
        "email": "",
        "role": ""
    };

    // Объект с сообщениями ошибок
    validationMessages = {
        "name": {
            "required": "Обязательное поле.",
            "minlength": "Значение должно быть не менее 4х символов.",
            "maxlength": "Значение не должно быть больше 15 символов."
        },
        "email": {
            "required": "Обязательное поле.",
            "emailValidator": "Не правильный формат email адреса."
        },
        "role": {
            "required": "Обязательное поле."
        },
        "age": {
            "required": "Обязательное поле.",
            "rangeValidator": "Значение должно быть в диапазоне от 10 до 100."
        }
    };
    
constructor(private service: HotelsListFullService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { }

    ngOnInit() {
        this.buildForm();
        this.getHotelFromRoute();
    }

    public getGuests(pricesPerRoom){
        let temp:number[]= [];
        for(let item in pricesPerRoom){
            temp.push(+item);
        }
        temp.push(this.curGuest);
        return temp;
    }

    public getPrices(pricesPerRoom){
        let temp:number[]= [];
        for(let item in pricesPerRoom){
            if(+pricesPerRoom[item] > 0){
                temp.push(+pricesPerRoom[item]);
            }
        }
        return temp;
    }

    public checkGuest(addedGuests, pricesPerRoom){
        let guestInTheList = this.guests.indexOf(addedGuests);
        console.log(guestInTheList);
        //3. If number was found - show msg
        if(guestInTheList >= 0 && this.tableOfOldPrices.length <= 0){
            return this.existingGuest=true;
        } else {
        // If not - add the guest to the list
            this.guests = this.getGuests(pricesPerRoom);
            console.log(this.guests);
            return this.existingGuest=false;
        }
    }

    public calculateBasePrice(pricesPerRoom){
        this.prices = this.getPrices(pricesPerRoom);
        console.log(this.prices);
        if(this.prices.length > 0){
            this.basePrice = Math.min.apply(null, this.prices);
            console.log(this.basePrice);
        } else {
            return this.basePrice;
        }
      
    }

    public addPrice() {
        //Get the number of guests entered by user
        let addedGuests =this.curGuest;
        // console.log(addedGuests);
         //Check guest within the list of previously entered guests
         let checkedGuest =  this.checkGuest(addedGuests,this.pricesPerRoom);
         if(checkedGuest){
             return false;
         }
        //get the price entered by user
        let addedPrice= this.hotelForm.value.prices;
        // console.log(addedPrice);
        console.log(this.tableOfOldPrices);
        if(this.tableOfOldPrices.length <= 0){
        //create Object with Guest <-> Price relation to be post to server
        this.pricesPerRoom[addedGuests] = +addedPrice;
        // console.log(this.pricesPerRoom);
        //calcculate base price
        this.calculateBasePrice(this.pricesPerRoom);
        // console.log(this.basePrice);
        //show table to user;
        this.tableOfPrices.push([addedGuests, addedPrice]);
        // console.log(this.tableOfPrices);
        this.showPrices=true;
        } else {
            this.oldPricesPerRoom[addedGuests] = +addedPrice;
            for(let i=0; i<this.tableOfOldPrices.length; i++){
                if(this.tableOfOldPrices[i][0]==addedGuests){
                    this.tableOfOldPrices[i][1]=+addedPrice;
                }
            }
            this.calculateBasePrice(this.oldPricesPerRoom);
            console.log(this.basePrice);
        }
    }
        

    public checkError(element: string, errorType: string) {
        return this.hotelForm.get(element).hasError(errorType) &&
            this.hotelForm.get(element).touched
    }

    public setRating(event){
        this.curRating =  +event.target.value;
        // console.log( this.curRating);
        return  this.curRating;
    }
    
    public setGuest(event){
        this.curGuest =  +event.target.value;
        // console.log(this.curGuest);
        return this.curGuest;
    }

    public splitAddServices(){
        let additionalServices:string[];   
        console.log(this.hotelForm.value.additionalServices);
         if(!this.hotelForm.value.additionalServices){
            return additionalServices=[];
         } else if (this.hotelForm.value.additionalServices.indexOf(",") > 0){
            return additionalServices = this.hotelForm.value.additionalServices.split(",");
         }else{
            return additionalServices=[this.hotelForm.value.additionalServices]; 
        }
        
    }    

    public onSubmit(hotelForm: FormGroup) {
        if(this.tableOfOldPrices.length > 0){
            let guest = this.getGuests(this.oldPricesPerRoom);
            for(let i=1; i< this.guestsList.length+1; i++){
                if(guest.indexOf(i) < 0) {this.oldPricesPerRoom[i]=0 }
            }
        } else{
            this.calculateBasePrice(this.pricesPerRoom);
            let guest2 = this.getGuests(this.pricesPerRoom);
            for(let i=1; i< this.guestsList.length+1; i++){
                if(guest2.indexOf(i) < 0) {this.pricesPerRoom[i]=0 }
            }
        }

        console.log(this.tableOfOldPrices.length)
        this.newHotel.country = hotelForm.value.country;
        this.newHotel.name = hotelForm.value.name;
        this.newHotel.img = hotelForm.value.img;
        this.newHotel.rating = this.curRating;
        this.newHotel.additionalServices = this.splitAddServices();
        this.newHotel.basePrice = this.basePrice;
        this.newHotel.daysOfStay = 1;
        if(this.tableOfOldPrices.length <= 0){
            this.newHotel.pricesPerRoom = this.pricesPerRoom;
        }else{
            this.pricesPerRoom =  this.oldPricesPerRoom;
            this.newHotel.pricesPerRoom = this.pricesPerRoom;
        }
           
        
        
        console.log(this.newHotel.country, 
            this.newHotel.name,
            this.newHotel.img,
            this.newHotel.rating,
            this.newHotel.additionalServices,
            this.newHotel.basePrice,
            this.newHotel.daysOfStay,
            this.newHotel.pricesPerRoom
            );


        if (this.newHotel.id) {
            this.service.updateHotel(this.newHotel)
                .subscribe(
                () => this.goBack(),
                error => this.errorMessage = error
                );
        } else {
            this.service.addHotel(this.newHotel)
                .subscribe(
                () => this.goBack(),
                error => this.errorMessage = error
                );
        }
    }

    public goBack() {
        this.router.navigate(["/edit"]);
    }

    private getHotelFromRoute() {
        this.activatedRoute.params.forEach((params: Params) => {
            let id = params["id"];

            if (id) {
                this.service.getHotel(id).subscribe(
                    hotel => {
                        this.newHotel = hotel;
                        this.hotelForm.patchValue(this.newHotel);
                        for(let item in this.newHotel.pricesPerRoom){
                            this.tableOfOldPrices.push([+item, +this.newHotel.pricesPerRoom[item]]);
                            this.oldPricesPerRoom[item] = +this.newHotel.pricesPerRoom[item];
                        };
                        this.oldBasePrice = this.newHotel.basePrice;
                    console.log(this.tableOfOldPrices);
                    console.log(this.oldPricesPerRoom);
                    },
                    error => this.errorMessage = error
                );
            this.showOldPrices = true;    
            this.showPrices=false;
            }
            else {
                this.newHotel = new HotelItem(null, null, null,null, null, null,null);
                this.hotelForm.patchValue(this.newHotel);
                this.tableOfOldPrices = [];
                this.oldPricesPerRoom ={};
                this.oldPricesPerRoom=0;
            }        

        });
    }

    

    private buildForm() {
        this.hotelForm = this.fb.group({
            country:["", [Validators.required, Validators.pattern("^[a-zA-Z\s]*$")]],
            name: ["", Validators.required],
            img:["", Validators.required],
            rating:["", Validators.required],
            numberOfGuests:[""],
            prices:[""],
            basePrice:[""],
            additionalServices:[""]
        });

        this.hotelForm.valueChanges
            .subscribe(data => this.onValueChange(data));

        this.onValueChange();
    }

   


    onValueChange(data?: any) {
        if (!this.hotelForm) return;
        let form = this.hotelForm;

        for (let field in this.formErrors) {
            this.formErrors[field] = "";
            // form.get - получение элемента управления
            let control = form.get(field);

            if (control && control.dirty && !control.valid) {
                let message = this.validationMessages[field];
                for (let key in control.errors) {
                    this.formErrors[field] += message[key] + " ";
                }
            }
        }
    }


       
}


