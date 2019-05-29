// import { Name } from './courses-name.interface';

export class CoursesList{
    constructor(
        public name:string,
        public title:string,
        public imageUrl:string,
        public courseUrl:string,
        public duration: string,
        public lessonsCount:string,
        public description:string,
        public adv?:boolean,
        public difficultyLevel?:string,
        public author?:string,
        public authorAlias?:string,
        public isFree?:boolean,
        public uploadDate?:string,
        ){}
}