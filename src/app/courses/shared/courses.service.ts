// import {Name} from "./courses-name.interface";
import {CoursesList} from "./courses-lists.interface";
import {CourseDetails} from "./courses-details.interface";

import { Injectable } from '@angular/core';

let name = ["HTML5&CSS3Start","JavaScriptEssential","JavaScriptAdvanced","Bootstrap4","HTML5&CSS3Advanced","TypeScriptFundamentals","AngularEssential"];

let courses:CoursesList[] = [
    new CoursesList(name[0],"HTML5 и CSS3 Starter","https://itvdn.blob.core.windows.net/catalog-images/html5-css3-starter-img.jpg","/video/html5-css3-starter","8 ч 0 м","8 уроков","Курс состоит из восьми логически взаимосвязанных уроков, на которых слушатель ознакомится с языком разметки гипертекста HTML, научится создавать html страницы. Познакомится с каскадными таблицами стилей – CSS, предназначенных для оформления веб страниц.", false,"Beginner", "Владимир Виноградов","vladimir-vinogradov",false,"2018-02-27T123116.53"),
    new CoursesList(name[1],"JavaScript Essential","https://itvdn.blob.core.windows.net/catalog-images/javascript-essential-img.jpg","/video/javascript-essential","7 ч 22 м","6 уроков","Этот видео курс содержит видео уроки по программированию на JavaScript для начинающих. Пройдя видео \"Базовый\", Вы сможете понимать код, написанный на данном программирования,знания, полученные на уроках, Вы сможете применить для написания небольших решений. В ходе курса будет рассмотрена работа с датами, документом, массивами и другими объектами.",false,"Middle","Дмитрий Охрименко","dmitriy-okhrimenko",false,"2013-07-06T110433.033"),
    new CoursesList(name[2], "JavaScript Advanced","https://itvdn.blob.core.windows.net/catalog-images/javascript-advanced-img.jpg","/video/javascript-advanced","12 ч 2 м","11 уроков","Видеокурс JavaScript для профессионалов будет полезным разработчикам, которые уже имеют базовые навыки разработки сайтов или прошли видео курс Java Script для начинающих.",false,"Advanced","Дмитрий Охрименко","dmitriy-okhrimenko",false,"2013-08-08T143520.893"),
    new CoursesList(name[3],"Bootstrap 4","https://itvdn.blob.core.windows.net/catalog-images/twitter-bootstrap4-img.jpg","/video/twitter-bootstrap4","4 ч 4 м","5 уроков","Bootstrap 4 – это HTML, CSS, JS фреймворк для разработки кроссбраузерных веб ориентированных интерфейсов. Bootstrap представляет набор инструментов от Twitter, созданный для облегчения разработки web-приложений и сайтов, использует CSS и HTML для типографии, форм, кнопок, таблиц, сеток, навигации и т.д., а также дополнительные расширения JavaScript, упрощающие работу веб разработчика.",false,"Middle","Илья Краевский","kraevskiy-ilya",false,"2018-01-30T105659.027"),
    new CoursesList(name[4], "HTML5 & CSS3 Advanced","https://itvdn.blob.core.windows.net/catalog-images/html-css-advanced-img.jpg","/video/html-css-advanced","7 ч 45 м","7 уроков","Курс состоит из 7 уроков, на которых учащиеся смогут ознакомиться с новыми функциями HTML5 & CSS3. Студенты рассмотрят возможность использования гибкой верстки, реализации анимации, использование хранилищ браузера и многопоточности, а также подключения препроцессора и сборщика для отображения кроссбраузерности веб-страницы на различных устройствах.",false,"Advanced", "Сергей Патёха","sergej-patjoha",false,"2018-07-31T114137.503"),
    new CoursesList(name[5],"TypeScript Fundamentals","https://itvdn.blob.core.windows.net/catalog-images/typescriptfundamentals-img.jpg","/video/typescriptfundamentals","1 ч 59 м","5 уроков","В этом курсе мы будем изучать язык TypeScript. Мы узнаем об основных отличияx от JavaScript и преимуществах работы с ним. Так же мы увидим, как использовать уже существующие библиотеки, такие как JQuery и Angular вместе с TypeScript. К концу курса, вы будете иметь все необходимое, чтобы приступить к созданию приложений на TypeScript",false,"Beginner","Сергей Войчик","sergey-voychik",false,"2016-09-22T132938.89"),
    new CoursesList(name[6],"Angular Essential","https://itvdn.blob.core.windows.net/catalog-images/angular2_essential-img.jpg","/video/angular2_essential","9 ч 46 м","7 уроков","Видеокурс Angular Essential создан для изучения Angular, который является переработанной и улучшенной версией популярного фреймворка AngularJS.\r\n",false,"Middle","Дмитрий Охрименко","dmitriy-okhrimenko",false,"2016-12-28T113108.91")
];

let  course:CourseDetails[] = [
    new CourseDetails(name[0], ["Введение в HTML", "Работа с изображениями, таблицами и списками","Каскадные таблицы стилей CSS3 (Часть 1)",
    "Каскадные таблицы стилей CSS3 (Часть 2)", "Позиционирование элементов. Виды верстки" , "Семантика HTML5. Новые теги.", 
    "Формы. Метатеги" , "Практика. Верстка страницы. Публикация на хостинге."]),
    new CourseDetails(name[1],["Введение", "Логические структуры", "Массивы", "Функции", "Объекты", "Практика 1", "Практика 2"]),
    new CourseDetails(name[2], ["Конструкторы и прототипы", "Работа с окнами браузера", "Работа с документами", "CSS и JavaScript",
    "События и обработка событий (Часть 1)", "События и обработка событий (Часть 2)", "Формы и элементы формы", "Cookies и механизмы сохранения данных на стороне клиента",
    "Работа с графикой на стороне клиента", "Ajax и работа с HTTP"]),
    new CourseDetails(name[3],["Знакомство с Twitter Bootstrap 4, типографика Twitter Bootstrap 4","Компоненты Twitter Bootstrap 4" , "Java Script Twitter Bootstrap 4", 
    "Утилиты Twitter Bootstrap 4 Служебные классы"]),
    new CourseDetails(name[4],["Микроданные и пользовательские данные. Геолокация", "Canvas", "Хранение данных на стороне клиента. Audio, Video",
    "Принципы построения разметки, Flex, Grid, Шаблоны сайтов", "Анимации и градиенты", "SASS основы", "Практика"]),
    new CourseDetails(name[5],["Введение. Переменные и функции", "Классы и интерфейсы", "Generics", "Модули и пространства имен", "Практика"]),
    new CourseDetails(name[6],["Введение" ,"Компоненты", "Директивы и привязка данных","Сервисы. Внедрение зависимостей", "Маршрутизация", "Формы", "HTTP", "Практика 1","Практика 2"])
];


let coursesPromise = Promise.resolve(courses);
let coursesDetailsPromise = Promise.resolve(course);

@Injectable()
export class CoursesService{
    showAll():Promise<CoursesList[]>{
        return coursesPromise;
    }

    getCourseDetails(name:string):Promise<CourseDetails>{
        return coursesDetailsPromise
        .then(coursesDetails => coursesDetails.find(details => details.name == name));
    }


}



