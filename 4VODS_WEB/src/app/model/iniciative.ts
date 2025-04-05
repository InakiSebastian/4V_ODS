import { IniciativeType } from "./iniciativeType";
import { Ods } from './ods';

export class Iniciative {
    public id: number;
    public name: string;
    public description: string;
    public startDate: Date;
    public endDate: Date | null;
    public hours: number;
    public schoolYear: string;
    public ods: Ods[];
    public type: IniciativeType;
    public innovative: number; 
    


    constructor(id: number, name: string, description: string, startDate: Date, endDate: (Date|null), hours: number, schoolYear: string, ods: Ods[], iniciativeType: IniciativeType, innovative: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.hours = hours;
        this.schoolYear = schoolYear;
        this.ods = ods;
        this.type = iniciativeType;
        this.innovative = innovative
    }

//     get Id(): number{
//         return this.id;
//     }

//     get Name(): string{
//         return this.name;
//     }

//     get Description(): string{
//         return this.description;
//     }

//     get StartDate(): Date{
//         return this.startDate;
//     }

//     get EndDate(): Date|null{
//         return this.endDate;
//     }

//     get Hours(): number{
//         return this.hours;
//     }

//     get schoolYear(): string{
//         return this.academicYear;
//     }

    
//     get Ods() : Ods[] {
//         return this.ods;
//     }
    
    
//     get IniciativeType(): IniciativeType
//     {
//         return this.iniciativeType;
//     }

    // set Id(id: number){
    //     this.id = id;
    // }

    // set Name(name: string){
    //     this.name = name;
    // }

    // set Description(description: string){
        
    //     this.description = description;
    // }

    // set StartDate(startDate: Date){
    //     this.startDate = startDate;
    // }

    // set EndDate(endDate: Date){
    //     this.endDate = endDate;
    // }

    // set Hours(hours: number){
    //     this.hours = hours;
    // }

    // set SchoolYear(academicYear: string){
    //     this.schoolYear = academicYear;
    // }

    // set Ods(ods: Ods[] ){
    //     this.ods = ods;
    // }

    // set Type(type: IniciativeType){
    //     this.type = type;
    // }
}
