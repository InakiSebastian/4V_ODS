import { Difusion } from "./difusion";
import { Goal } from "./goal";
import { Iniciative } from "./iniciative";
import { IniciativeType } from "./iniciativeType";
import { Module } from "./module";
import { Ods } from "./ods";
import { Teacher } from "./teacher";

export class CompliteIniciative extends Iniciative{
    
    public teachers: Teacher[];
    public modules: Module[];
    public difusions: Difusion[];
    public goals: Goal[]

    constructor(id: number, name: string, description: string, startDate: Date, endDate: (Date|null), hours: number, academicYear: string, ods: Ods[], iniciativeType: IniciativeType,
        techers: Teacher[], modules: Module[], difusions: Difusion[], goals: Goal[]
    ){
        super(id,name, description, startDate, endDate, hours, academicYear, ods, iniciativeType)
        this.teachers = techers;
        this.modules = modules;
        this.difusions = difusions;
        this.goals = goals;
    }

    get Teachers(){
        return this.teachers;
    }

    get Modules(){
        return this.modules;
    }

    get Difusions(){
        return this.difusions;
    }

    get Goals(){
        return this.goals;
    }

    set Teachers(teachers: Teacher[]){
        this.teachers = teachers;
    }

    set Modules(modules: Module[]){
        this.modules = modules;
    }

    set Difusions(difusions: Difusion[]){
        this.difusions = difusions;
    }

    set Goals(goals: Goal[]){
        this.goals = goals;
    }

}