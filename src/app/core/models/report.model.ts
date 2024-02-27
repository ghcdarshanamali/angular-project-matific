export class Report{

    id:number;
    content:string;
    attempts:{weeks: Date[]; values:number[]};
    student:string;
    time:string;
    skill:string;
    type:string;
}