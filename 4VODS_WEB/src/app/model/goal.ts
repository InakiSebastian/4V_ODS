export class Goal {
    idGoal: number;
    idODS: number;
    description: string;

    constructor(idGoal: number, idODS: number, description: string) {
        this.idGoal = idGoal;
        this.idODS = idODS;
        this.description = description;
    }

    get IdGoal(): number {
        return this.idGoal;
    }

    get IdODS(): number {
        return this.idODS;
    }

    get Description(): string {
        return this.description;
    }
}