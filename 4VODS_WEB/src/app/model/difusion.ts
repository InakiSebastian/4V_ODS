export class Difusion{
    public idDiffusion: number;
    public idIniciative: number;
    public type: string;
    public link: string;

    constructor(idDiffusion: number, idIniciative: number, type: string, link: string){
        this.idDiffusion = idDiffusion;    
        this.idIniciative = idIniciative;
        this.type = type;
        this.link = link;    
    }

    get IdDifusion(): number {
        return this.idDiffusion;
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