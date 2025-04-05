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
    public diffusions: Difusion[];
    public goals: Goal[]

    constructor(id: number, name: string, description: string, startDate: Date, endDate: (Date|null), hours: number, academicYear: string, ods: Ods[], iniciativeType: IniciativeType,
        techers: Teacher[], modules: Module[], diffusions: Difusion[], goals: Goal[],
        isInnovative: number
    ){
        super(id,name, description, startDate, endDate, hours, academicYear, ods, iniciativeType, isInnovative)
        this.teachers = techers;
        this.modules = modules;
        this.diffusions = diffusions;
        this.goals = goals;
    }



}