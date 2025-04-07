export class Goal {
    public id: number;
    public ods: number;
    public description: string;

    constructor(id: number, idODS: number, description: string) {
        this.id = id;
        this.ods = idODS;
        this.description = description;
    }

}