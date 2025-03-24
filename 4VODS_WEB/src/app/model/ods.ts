export class Ods{
    id: number;
    idDimension: number;
    description: string;

    constructor(id: number, description: string, idDimension: number) {
        this.id = id;
        this.description = description;
        this.idDimension = idDimension;
    }

    get Id(): number {
        return this.id;
    }

    get Description(): string {
        return this.description;
    }

    get idDimension
}