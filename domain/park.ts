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
    firstParentIndex: number,
    secondParentIndex: number,
    name: string = "",
  ): Park {
    const firstParent = this.dinosaurs[firstParentIndex];
    const secondParent = this.dinosaurs[secondParentIndex];
    if (
      !firstParent ||
      !secondParent
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
      new Dinosaur(name, 5),
    ]);
  }

  feed(dinosaurToFeedIndex: number): Park {
    const dinosaurs = [...this.dinosaurs];

    const dinosaurToFeed = dinosaurs[dinosaurToFeedIndex];

    if (!dinosaurToFeed) {
      throw new CannotFeedDinosaursNotInPark("The dinosaur is not in the park");
    }

    if (!dinosaurToFeed.isAlive) {
      throw new CannotFeedDeadDinosaur("This dinosaur is dead");
    }

    dinosaurs[dinosaurToFeedIndex].hunger = 10;

    return new Park(dinosaurs);
  }

  euthanize(dinosaurToEuthanizeIndex: number): Park {
    const dinosaurs = [...this.dinosaurs];

    const dinosaurToEuthanize = dinosaurs[dinosaurToEuthanizeIndex];
    if (!dinosaurToEuthanize) {
      throw new CannotEuthanize("The dinosaur is not in the park");
    }

    return new Park([
      ...dinosaurs.slice(0, dinosaurToEuthanizeIndex),
      new Dinosaur(dinosaurToEuthanize.name, dinosaurToEuthanize.hunger, false),
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
