import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HotelItem } from '../../shared/hotel';
import { HotelsListFullService } from '../../shared/hotels-lists-full.service';

@Component({
    selector: 'hotels-list-full',
    templateUrl: 'hotels-list-full-info.component.html',
    styleUrls: ['hotels-list-full-info.component.css']
})

export class HotelsListFullComponent implements OnInit{
    currentHotel:HotelItem;
    currentHotelName:string = "";
    hotels:HotelItem[];
    errorMessage: string;
    prices:any;
    guests: number[]  = [1,2,3,4,5,6];
    forwardIconSrc:String = "assets/img/angle-double-right-solid.png";

    constructor(private service: HotelsListFullService,
        private router: Router) { }

    ngOnInit() {
        this.getHotels();
        this.getPrices();
    }

    public refresh() {
        this.getHotels();
    }

    public showMoreInfo(hotel: HotelItem) {
        this.router.navigate(["edit", "showinfo", hotel.id]);
    }

    public editHotel(hotel: HotelItem) {
        this.router.navigate(["edit", "edit", hotel.id]);
    }

    public deleteHotel(hotel: HotelItem) {
        this.currentHotel = hotel;
        this.currentHotelName = hotel.name;
    }

    public confirmDeleteHotel(currentHotel) {
        this.service.deleteHotel(currentHotel)
            .subscribe(
            () => {
                this.getHotels();
                this.goBack()},
            error => this.errorMessage = error
            );
    }

    goBack() {
        this.router.navigate(["/edit"]);
    }

    public createHotel() {
        this.router.navigate(["edit", "create"]);
    }

    private getHotels() {
        this.service.getHotels().subscribe(
            hotels => this.hotels = hotels,
            error => this.errorMessage = error
        );
        
    }

    private getPrices() {
        this.service.getPrices().subscribe(
            prices => this.prices = prices,
            error => this.errorMessage = error
        );
    }

    goToHotelsList(){
        this.router.navigate(["/hotels"]);
    }

    goToAdminPage(){
        this.router.navigate(["/hotels/admin"]);
    }

}