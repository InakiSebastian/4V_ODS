import { Difusion } from "./difusion";
import { IniciativeType } from "./iniciativeType";

export class NewIniciativeCreate {
    public name: string;
    public description: string;
    public startDate: Date;
    public endDate: Date | null;
    public hours: number;
    public schoolYear: string;
    public innovative: number; 
    public type: IniciativeType;
    public ods: number[];

    public teachers: number[];
    public modules: number[];
    public diffusions: any[]; // Debería ser diffusion
    public goals: number[]
    public companies: number[]

    constructor(name: string, description: string, startDate: Date, endDate: (Date | null), hours: number, schoolYear: string, ods: number[], iniciativeType: IniciativeType, innovative: number, teachers: number[], modules: number[], diffusions: any[], goals: number[], companies: number[]) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.hours = hours;
        this.schoolYear = schoolYear;
        this.ods = ods;
        this.type = iniciativeType;
        this.innovative = innovative;
        this.teachers = teachers;
        this.modules = modules;
        this.diffusions = diffusions;
        this.goals = goals;
        this.companies = companies
    }
}