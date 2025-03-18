export class Ods{
    id: number;
    description: string;

    constructor(id: number, description: string) {
        this.id = id;
        this.description = description;
    }

    get Id(): number {
        return this.id;
    }

    get Description(): string {
        return this.description;
    }
}