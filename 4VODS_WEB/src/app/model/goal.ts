export class Goal {
    public idGoal: number;
    public ods: number;
    public description: string;

    constructor(idGoal: number, idODS: number, description: string) {
        this.idGoal = idGoal;
        this.ods = idODS;
        this.description = description;
    }

}