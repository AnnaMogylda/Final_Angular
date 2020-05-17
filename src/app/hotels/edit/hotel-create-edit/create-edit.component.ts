import { Component, OnInit } from "@angular/core";
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from "@angular/forms";
import { HotelItem } from '../../shared/hotel';
import { HotelsListFullService } from '../../shared/hotels-lists-full.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

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
    additionalServicesList:string[] = [
        "SPA",
        "Golf",
        "Transfer",
        "Car rent",
        "Excursions",
        "Driver"
    ];       
    showChecked=[];
    guests:number[] = []; 
    oldPricesPerRoom:number[] = [];
    prices:any;
    updatedPrices:any;
    tableOfOldPrices:Array<number[]> =[];
    showPrices:boolean = true;
    showOldPrices:boolean = false;
    pricesPerRoom:any = {};
    basePrice:number = 0;
    guestsList: number[]  = [1,2,3,4,5,6];
    curGuest: number;
    curRating:number;
    additionalServices:string[] = [];
    newAddServices:string[]= [];
    oldAddServices:string[]= [];
    showOldServices:boolean = true;


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

    createItem(): FormGroup {
        return this.fb.group({
          price: '',
        });
      }

    addItem(): void {
        this.prices = this.hotelForm.get('prices') as FormArray;
        this.prices.push(this.createItem());
        if(this.prices.length==0){
            for(let i=0; i<6; i++){
                this.pricesPerRoom[i+1] = 0;
            }
        }
        for(let i=0; i<this.prices.length-1; i++){
            if(this.prices.value[i].price != ""){
                this.pricesPerRoom[i+1] = +this.prices.value[i].price;                                                  this.prices.value[i].price;
            } else{
                this.pricesPerRoom[i+1] = 0;
            }    
        }
        console.log(this.pricesPerRoom);
        this.calculateBasePrice(this.pricesPerRoom);
        console.log(this.basePrice);
        this.showPrices=true;
    }

    editItem():void{
        this.updatedPrices = this.hotelForm.get('prices') as FormArray;
        this.updatedPrices.push(this.createItem());
        for(let i=0; i<this.updatedPrices.length-1; i++){
            if(this.updatedPrices.value[i].price != ""){
                this.pricesPerRoom[i+1] = +this.updatedPrices.value[i].price;                                                                                                                                     
            } else{
                this.pricesPerRoom[i+1] = +this.oldPricesPerRoom[i+1];  
            }             
        }
        console.log(this.pricesPerRoom);
        this.calculateBasePrice(this.pricesPerRoom);
        console.log(this.basePrice);
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

    
onChange(servicesSelected: string, isChecked: boolean) {
    const services = (this.hotelForm.controls.servicesSelected as FormArray);
    if (isChecked) {
        services.push(new FormControl(servicesSelected));
    } else {
      const index = services.controls.findIndex(x => x.value === servicesSelected);
      console.log(index);
      if(index==-1){
        let indexOfService = this.oldAddServices.indexOf(servicesSelected);
        this.oldAddServices.splice(indexOfService, indexOfService+1);
      } 
      services.removeAt(index);
    }
    this.newAddServices = services.value;
    console.log(this.newAddServices);
  }

    public onSubmit(hotelForm: FormGroup) {
        //creating a hotel
        if(this.tableOfOldPrices.length==0){
            this.addItem();
            this.additionalServices = this.newAddServices;
        //editing the hotel
        } else{
            this.editItem();
            if( this.newAddServices.length == 0){
                this.additionalServices = this.oldAddServices;
            } else{
                this.additionalServices = this.newAddServices.concat(this.oldAddServices);
            }
 
        }

        this.newHotel.country = hotelForm.value.country;
        this.newHotel.name = hotelForm.value.name;
        this.newHotel.img = hotelForm.value.img;
        this.newHotel.rating = this.curRating;
        this.newHotel.additionalServices = this.additionalServices;
        this.newHotel.basePrice = this.basePrice;
        this.newHotel.daysOfStay = 1;
        this.newHotel.pricesPerRoom = this.pricesPerRoom;
      
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
            const id = params["id"];

            if (id) {
                this.service.getHotel(id).subscribe(
                    hotel => {
                        this.newHotel = hotel;
                        this.hotelForm.patchValue(this.newHotel);
                        for(let item in this.newHotel.pricesPerRoom){
                            this.tableOfOldPrices.push([+item, +this.newHotel.pricesPerRoom[item]]);
                            this.oldPricesPerRoom[item] = +this.newHotel.pricesPerRoom[item];
                            this.oldAddServices = this.newHotel.additionalServices;
                            this.additionalServicesList.forEach(service =>{
                                let temp = this.oldAddServices.indexOf(service);
                                if(temp == -1){
                                    this.showChecked.push(false);
                                } else{
                                    this.showChecked.push(true);
                                }
                            })
                        };
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
                // this.oldPricesPerRoom ={};
                // this.oldPricesPerRoom=0;
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
            prices: this.fb.array([this.createItem(), this.createItem(), this.createItem(), this.createItem(), this.createItem(), this.createItem()]),
            basePrice:[""],
            servicesSelected: this.fb.array([]),
            additionalServices:[""]
        });
        this.hotelForm.valueChanges
            .subscribe(data => this.onValueChange(data));
        this.onValueChange();
    }

    
    onValueChange(data?: any) {
        if (!this.hotelForm) return;
        const form = this.hotelForm;
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


