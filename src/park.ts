import { Dinosaur } from './dinosaur.ts';

export class Park {
    dinosaurs: Dinosaur[];

    constructor(dinosaurs: Dinosaur[] = []) {
        this.dinosaurs = dinosaurs;
    }
}

export const initiatePark = () => {
    const newDinosaur = new Dinosaur();
    return new Park([newDinosaur, newDinosaur]);
};