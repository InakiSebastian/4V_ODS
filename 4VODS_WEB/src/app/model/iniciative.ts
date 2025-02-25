export class Iniciative {
    private id: number;
    private name: string;
    private description: string;
    private startDate: Date;
    private endDate: Date;
    private hours: number;

    private iniciativeType: string //TODOIKER: cambiar a tipo enum

    constructor(id: number, name: string, description: string, startDate: Date, endDate: Date, hours: number, iniciativeType: string){
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.hours = hours;

        this.iniciativeType = iniciativeType;
    }

    get Id(): number{
        return this.id;
    }

    get Name(): string{
        return this.name;
    }

    get Description(): string{
        return this.description;
    }

    get StartDate(): Date{
        return this.startDate;
    }

    get EndDate(): Date{
        return this.endDate;
    }

    get Hours(): number{
        return this.hours;
    }
    
    get IniciativeType(): string
    {
        return this.iniciativeType;
    }

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
    set IniciativeType(type: string){
        this.iniciativeType = type;
    }
}
