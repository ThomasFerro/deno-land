import { Dinosaur } from './dinosaur.ts';

export class Park {
    dinosaurs: Dinosaur[];

    constructor(dinosaurs: Dinosaur[] = []) {
        this.dinosaurs = dinosaurs;
    }

    breed(firstParent: Dinosaur, secondParent: Dinosaur, name: string = ''): Park {
        return new Park([
            ...this.dinosaurs,
            new Dinosaur(name),
        ]);
    }
}

export const initiatePark = () => {
    const newDinosaur = new Dinosaur();
    return new Park([newDinosaur, newDinosaur]);
};