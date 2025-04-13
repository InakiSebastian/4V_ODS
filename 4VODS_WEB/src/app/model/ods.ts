export class Ods{
    id: number;
    dimension: string;
    description: string;

    constructor(id: number,dimension: string, description: string) {
        this.id = id;
        this.description = description;
        this.dimension = dimension;
    }
}