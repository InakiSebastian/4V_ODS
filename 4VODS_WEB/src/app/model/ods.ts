export class Ods{
    id: number;
    description: string;

    constructor(id: number, description: string) {
        this.id = id;
        this.description = description;
    }

    Id(): number {
        return this.id;
    }

    Description(): string {
        return this.description;
    }
}