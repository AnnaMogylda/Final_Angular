import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';

// подключение необходимых методов для работы с Observable
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";


@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;

    // URL для перенаправления после авторизации
    redirectUrl: string;

    login(email: string, password: string):Observable<boolean> {
        // создание Observable объекта
        return of(true)       // добавление элементов в последовательность объекта
        .delay(1000)    // задержка на 1 сек.
        .do(val => { 
            console.log(email, password);  // выполнение действия для каждого элемента в последовательности
            if (email == "test@test.ua" && password == "qwerty"){
                this.isLoggedIn = true;
                return this.isLoggedIn;
            }
        });
    }

    logout(): void {
        this.isLoggedIn = false;
    }
}
