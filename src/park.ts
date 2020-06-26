import { Dinosaur } from './dinosaur.ts';

export class CannotBreed extends Error {}

export class Park {
    dinosaurs: Dinosaur[];

    constructor(dinosaurs: Dinosaur[] = []) {
        this.dinosaurs = dinosaurs;
    }

    breed(firstParent: Dinosaur, secondParent: Dinosaur, name: string = ''): Park {
        if (this.dinosaurs.indexOf(firstParent) === -1
            || this.dinosaurs.indexOf(secondParent) === -1) {

            throw new CannotBreed('One of the parent is not in the park');
        }

        return new Park([
            ...this.dinosaurs,
            new Dinosaur(name),
        ]);
    }
}

export const initiatePark = () => {
    return new Park([
        new Dinosaur('', 0.5),
        new Dinosaur('', 0.5),
    ]);
};