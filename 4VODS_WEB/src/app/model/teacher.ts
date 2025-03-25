export class Teacher {
    public id: number;
    public name: string;

    constructor(id: number, name: string) {
        this.id = id;    
        this.name = name;
    }   

    get Id(): number {
        return this.id;
    }

    get Name(): string {
        return this.name;
    }
}