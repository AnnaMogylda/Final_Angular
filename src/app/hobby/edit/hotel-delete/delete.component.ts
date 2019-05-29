import { Component, OnInit } from "@angular/core";
import { HotelsListFullService } from '../../shared/hotels-lists-full.service';
import { HotelItem } from '../../shared/hotel';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'delete',
    templateUrl: 'delete.component.html',
    styleUrls: ['delete.component.css']
})

export class DeleteListComponent implements OnInit{
    currentHotel: HotelItem;
    errorMessage: string;

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private service: HotelsListFullService) { }

    ngOnInit() {
        let id = this.activatedRoute.snapshot.params["id"];
        if (id) {
            this.service.getHotel(id)
                .subscribe(
                hotel => this.currentHotel = hotel,
                error => this.errorMessage = error
                );
        }
    }

    deleteHotel() {
        this.service.deleteHotel(this.currentHotel)
            .subscribe(
            () => this.goBack(),
            error => this.errorMessage = error
            );
    }

    goBack() {
        this.router.navigate(["/edit"]);
    }

}
