export class Module {
    public id: number
    public name: string
    public idCiclo: number
    
    constructor(id: number, idCiclo: number, name: string) {
        this.id = id;    
        this.idCiclo = idCiclo;
        this.name = name;
    }

    get Id(): number {
        return this.id;
    }

    get IdCiclo(): number {
        return this.idCiclo;
    }

    get Name(): string {
        return this.name;
    }
}