export class Module {
    public id: number
    public name: string
    public idCiclo: number
    
    constructor(id: number, idCiclo: number, name: string) {
        this.id = id;    
        this.idCiclo = idCiclo;
        this.name = name;
    }


}