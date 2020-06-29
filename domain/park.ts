import { Dinosaur } from "./dinosaur.ts";

export class CannotBreedDinosaursNotInPark extends Error {}
export class CannotBreedDeadDinosaur extends Error {}
export class CannotFeedDinosaursNotInPark extends Error {}
export class CannotFeedDeadDinosaur extends Error {}
export class CannotEuthanize extends Error {}

export class Park {
  dinosaurs: Dinosaur[];

  constructor(dinosaurs: Dinosaur[] = []) {
    this.dinosaurs = dinosaurs;
  }

  breed(
    firstParent: Dinosaur,
    secondParent: Dinosaur,
    name: string = "",
  ): Park {
    if (
      this.dinosaurs.indexOf(firstParent) === -1 ||
      this.dinosaurs.indexOf(secondParent) === -1
    ) {
      throw new CannotBreedDinosaursNotInPark(
        "One of the parent is not in the park",
      );
    }

    if (
      !firstParent.isAlive ||
      !secondParent.isAlive
    ) {
      throw new CannotBreedDeadDinosaur("One of the parent is dead");
    }

    return new Park([
      ...this.dinosaurs,
      new Dinosaur(name),
    ]);
  }

  feed(dinosaur: Dinosaur): Park {
    const dinosaurs = [...this.dinosaurs];

    const dinosaurToFeedIndex = dinosaurs.indexOf(dinosaur);

    if (dinosaurToFeedIndex === -1) {
      throw new CannotFeedDinosaursNotInPark("The dinosaur is not in the park");
    }

    if (!dinosaurs[dinosaurToFeedIndex].isAlive) {
      throw new CannotFeedDeadDinosaur("This dinosaur is dead");
    }

    dinosaurs[dinosaurToFeedIndex].hunger = 10;

    return new Park(dinosaurs);
  }

  euthanize(dinosaur: Dinosaur): Park {
    const dinosaurs = [...this.dinosaurs];

    const dinosaurToEuthanizeIndex = dinosaurs.indexOf(dinosaur);

    if (dinosaurToEuthanizeIndex === -1) {
      throw new CannotEuthanize("The dinosaur is not in the park");
    }

    return new Park([
      ...dinosaurs.slice(0, dinosaurToEuthanizeIndex),
      new Dinosaur(dinosaur.name, dinosaur.hunger, false),
      ...dinosaurs.slice(dinosaurToEuthanizeIndex + 1),
    ]);
  }

  passTime(): Park {
    return new Park(this.dinosaurs.map(
      (dinosaur: Dinosaur): Dinosaur => {
        if (!dinosaur.isAlive) {
          return dinosaur;
        }
        const newDinosaur = new Dinosaur(
          dinosaur.name,
          dinosaur.hunger - 1,
          dinosaur.isAlive,
        );
        if (newDinosaur.hunger <= 0) {
          newDinosaur.isAlive = false;
        }
        return newDinosaur;
      },
    ));
  }

  get gameOver(): boolean {
    return !(this.dinosaurs.some((dinosaur) => dinosaur.isAlive));
  }
}

export const initiatePark = () => {
  return new Park([
    new Dinosaur("", 5),
    new Dinosaur("", 5),
  ]);
};
