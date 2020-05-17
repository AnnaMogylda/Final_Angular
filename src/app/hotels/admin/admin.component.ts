import { Component, OnInit } from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { User } from '../shared/user';
import { Router } from "@angular/router";
import {AuthService} from "../shared/auth.service";

@Component({
    selector: 'admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.css']
})

export class AdminComponent implements OnInit{

userForm: FormGroup;
user: User = new User();
LogInStatus: string;
messageInfo:string;

formErrors = {
    "email" :"",
    "password" : ""
};

validationMessages = {
    "email": {
        "required": "E-mail address is required.",
        "pattern": "Invalid e-mail format.",
    },
    "password" : {
        "required": "E-mail address is required.",
        "minlength": "Password should contain more than 5 symbols",
        "maxlength": "Password should contain less than 20 symbols",
        "passwordValidator" : "Wrong password"
    }
}

constructor(private fb:FormBuilder, public router:Router, public authService:AuthService){
    this.setLogInStatus(),
    this.setMessageInfo()
}
    
setLogInStatus() {
    this.LogInStatus = "Logged " + (this.authService.isLoggedIn ? "in" : "out");
}

setMessageInfo(){
    this.messageInfo = "Please enter your e-mail and password here to log in";
}

logout() {
    this.authService.logout();
    this.setLogInStatus();
}

ngOnInit(){
    console.log("To login as admin, use e-mail: test@test.ua, password: qwerty");
    this.buildForm()
}

buildForm(){
    this.userForm = this.fb.group({
        "email" : [this.user.email,
            [Validators.required,
            Validators.pattern("[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}")
            ]],
        "password" : [this.user.password,
            [Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
            ]]
    });  

    this.userForm.valueChanges
    .subscribe(data => this.onValueChange(data));

    this.onValueChange()
}
   
onValueChange(data?: any) {
    if (!this.userForm) return;
    let form = this.userForm;

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

login() {
    this.LogInStatus = "Trying to log in ...";
    this.authService.login(this.userForm.value.email, this.userForm.value.password).subscribe(() => {
        this.setLogInStatus();
        if (this.authService.isLoggedIn) {
            // Получение строки для перенаправления от сервиса
            // если строки нет перенаправляем на страницу по умолчнанию
            let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : "/hotels/edit";
            // перенапраление пользователя
            this.router.navigate([redirect]);
        } else{
            this.messageInfo="Incorrect login and password";
        }
    });
}

onSubmit() {
    console.log(this.userForm.value);
}

goToHotelsList(){
    this.router.navigate(["/hotels"]);
}


}