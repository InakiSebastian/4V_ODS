export class Difusion{
    public idDifusion: number;
    public idIniciative: number;
    public type: string;
    public link: string;

    constructor(idDifusion: number, idIniciative: number, type: string, link: string){
        this.idDifusion = idDifusion;    
        this.idIniciative = idIniciative;
        this.type = type;
        this.link = link;    
    }

    get IdDifusion(): number {
        return this.idDifusion;
    }

    get IdIniciative(): number {
        return this.idIniciative;
    }

    get Type(): string {
        return this.type;
    }

    get Link(): string {
        return this.link;
    }
}