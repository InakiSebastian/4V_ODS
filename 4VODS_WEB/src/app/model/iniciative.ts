import { IniciativeType } from "./iniciativeType";
import { Ods } from './ods';

export class Iniciative {
    public id: number;
    public name: string;
    public description: string;
    public startDate: Date;
    public endDate: Date | null;
    public hours: number;
    public academicYear: string;
    public ods: Ods[];
    public iniciativeType: IniciativeType; 


    constructor(id: number, name: string, description: string, startDate: Date, endDate: (Date|null), hours: number, academicYear: string, ods: Ods[], iniciativeType: IniciativeType){
        
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.hours = hours;
        this.academicYear = academicYear;
        this.ods = ods;

        this.iniciativeType = iniciativeType;
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

//     get AcademicYear(): string{
//         return this.academicYear;
//     }

    
//     get Ods() : Ods[] {
//         return this.ods;
//     }
    
    
//     get IniciativeType(): IniciativeType
//     {
//         return this.iniciativeType;
//     }

    set Id(id: number){
        this.id = id;
    }

    set Name(name: string){
        this.name = name;
    }

    set Description(description: string){
        
        this.description = description;
    }

    set StartDate(startDate: Date){
        this.startDate = startDate;
    }

    set EndDate(endDate: Date){
        this.endDate = endDate;
    }

    set Hours(hours: number){
        this.hours = hours;
    }

    set AcademicYear(academicYear: string){
        this.academicYear = academicYear;
    }

    set Ods(ods: Ods[] ){
        this.ods = ods;
    }

    set IniciativeType(type: IniciativeType){
        this.iniciativeType = type;
    }
}
