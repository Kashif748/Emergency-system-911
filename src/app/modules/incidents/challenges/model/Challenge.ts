export interface Ichallenge {

    id:number;
    challenge:string;
    requmendations:string;

}

export class Challenge {

    id:number;
    challenge:string;
    requmendations:string;

    constructor(challenge:Ichallenge) {

        this.id = challenge.id || 0;
        this.challenge = challenge.challenge || "";
        this.requmendations = challenge.requmendations || "";

    }
}