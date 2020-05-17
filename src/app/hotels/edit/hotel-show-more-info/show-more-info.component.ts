import { Component, OnInit } from "@angular/core";
import { HotelsListFullService } from '../../shared/hotels-lists-full.service';
import { HotelItem } from '../../shared/hotel';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';


@Component({
    selector: 'show-more-info',
    templateUrl: 'show-more-info.component.html',
    styleUrls: ['show-more-info.component.css']
})

export class ShowMoreInfoComponent implements OnInit{
    guests: number[]  = [1,2,3,4,5,6];
    currentHotel: HotelItem;
    showAddServices:boolean = true;
    errorMessage: string;

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private service: HotelsListFullService) { }

        ngOnInit() {
            const id = this.activatedRoute.snapshot.params["id"];
            if (id) {
                this.service.getHotel(id)
                    .subscribe(
                    hotel => { this.currentHotel = hotel;
                        if(this.currentHotel.additionalServices.length == 0){
                            this.showAddServices = false;
                        }
                    },
                    error => this.errorMessage = error
                    );
            }
        }

        
    goBack() {
        this.router.navigate(["/edit"]);
    }

    

}
