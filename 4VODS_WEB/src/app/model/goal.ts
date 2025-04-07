export class Goal {
    public id: number;
    public ods: number;
    public description: string;

    constructor(idGoal: number, idODS: number, description: string) {
        this.id = idGoal;
        this.ods = idODS;
        this.description = description;
    }

}