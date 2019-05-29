import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {HttpErrorResponse} from "@angular/common/http";
import { HotelItem } from "./hotel";

import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { throwError } from 'rxjs';

@Injectable()
export class HotelsListFullService {
    // адрес сервиса
    private url = "http://localhost:2403/hotels";
    result:any;

    constructor(private http: HttpClient) { }

    public getHotels(): Observable<HotelItem[]> {
        let hotels = this.http.get(this.url)
            .map(data => {console.log(data); return data})
            .catch(this.handleError);
            console.log(hotels);
        return hotels;
    }

    public getPrices():Observable<HotelItem[]> {
        let prices = this.http.get(this.url)
            .map(data => {
                let arr = [];
                for(let item in data){
                    arr.push(data[item].pricesPerRoom);
                    console.log(arr)
                }
                return arr})
            .catch(this.handleError);
        console.log(prices);
        return prices;
    }

    public getHotel(id: string): Observable<HotelItem> {
        let hotel = this.http.get(this.url + "/" + id)
            .map(data => {console.log(data); return data}) // преобразовывает ответ в экземпляр Product.
            .catch(this.handleError);
        return hotel;
    }

    // // Отправка POST запроса на сервер, добавление нового продукта в базу.
    public addHotel(hotel: HotelItem):Observable<HotelItem>  {
        return this.http.post(this.url, hotel)
            .catch(this.handleError);
    }

    // // Отправка PUT запроса и обновление продукта в базе.
    public updateHotel(hotel: HotelItem):Observable<HotelItem>  {
        return this.http.put(this.url + "/" + hotel.id, hotel)
            .catch(this.handleError);
    }

    // // Отправка DELETE запроса и удаление продукта из базы.
    public deleteHotel(hotel: HotelItem) :Observable<HotelItem> {
        return this.http.delete(this.url + "/" + hotel.id)
            .catch(this.handleError);
    }

    // private extractHotels (response: Response) {
    //     let res:any = response.json();
    //     let hotels: HotelItem[] = [];
    //     for (let i = 0; i < res.length; i++) {
    //         hotels.push(new HotelItem(res[i].country, res[i].name, res[i].img, res[i].rating, res[i].basePrice, res[i].pricesPerRoom, res[i].daysOfStay, res[i].additionalServices, res[i].id));
    //     }
    //     return hotels;
    // }

    // private extractHotel (response: Response) {
    //     let res:any = response.json();
    //     let hotel = new HotelItem(res.country, res.name, res.img, res.rating, res.basePrice, res.pricesPerRoom, res.daysOfStay, res.additionalServices, res.id);
    //     return hotel;
    // }

    private handleError(error: any, cought: Observable<any>): any {
        let message = "";

        if (error instanceof HttpErrorResponse) {
            let errorData = error.error || JSON.stringify(error);
            message = `${error.status} - ${error.statusText || ''} ${errorData}`
        } else {
            message = error.message ? error.message : error.toString();
        }

        console.error(message);

        return throwError(message);
    }

    // Отправка GET запроса нв сервер
    // public getHotels(): Observable<HotelItem[]> {
    //     let hotels = this.http.get(this.url)
    //         .map(this.extractHotels)
    //         .catch(this.handleError);
    //     return hotels;
    // }

    // public getProduct(id: string): Observable<HotelItem> {
    //     let hotel = this.http.get(this.url + "/" + id)
    //         .map(this.extractHotel) // преобразовывает ответ в экземпляр Product.
    //         .catch(this.handleError);
    //     return hotel;
    // }

    // // Отправка POST запроса на сервер, добавление нового продукта в базу.
    // public addHotel(hotel: HotelItem):Observable<HotelItem>  {
    //     return this.http.post(this.url, hotel)
    //         .catch(this.handleError);
    // }

    // // Отправка PUT запроса и обновление продукта в базе.
    // public updateHotel(hotel: HotelItem):Observable<HotelItem>  {
    //     return this.http.put(this.url + "/" + hotel.id, hotel)
    //         .catch(this.handleError);
    // }

    // // Отправка DELETE запроса и удаление продукта из базы.
    // public deleteHotel(hotel: HotelItem) :Observable<HotelItem> {
    //     return this.http.delete(this.url + "/" + hotel.id)
    //         .catch(this.handleError);
    // }

    // private extractHotels (response: Response) {
    //     let res:any = response.json();
    //     let hotels: HotelItem[] = [];
    //     for (let i = 0; i < res.length; i++) {
    //         hotels.push(new HotelItem(res[i].country, res[i].name, res[i].img, res[i].rating, res[i].basePrice, res[i].pricesPerRoom, res[i].daysOfStay, res[i].additionalServices, res[i].id));
    //     }
    //     return hotels;
    // }

    // private extractHotel (response: Response) {
    //     let res:any = response.json();
    //     let hotel = new HotelItem(res.country, res.name, res.img, res.rating, res.basePrice, res.pricesPerRoom, res.daysOfStay, res.additionalServices, res.id);
    //     return hotel;
    // }

    // private handleError(error: any, cought: Observable<any>): any {
    //     let message = "";

    //     if (error instanceof Response) {
    //         let temp:any = error.json();
    //         let errorData = temp.error || JSON.stringify(temp);
    //         message = `${error.status} - ${error.statusText || ''} ${errorData}`
    //     } else {
    //         message = error.message ? error.message : error.toString();
    //     }

    //     console.error(message);

    //     return throwError(message);
    // }
}

