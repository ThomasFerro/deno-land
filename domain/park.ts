import { Dinosaur } from "./dinosaur.ts";

export class CannotBreed extends Error {}
export class CannotFeed extends Error {}

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
      throw new CannotBreed("One of the parent is not in the park");
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
      throw new CannotFeed("The dinosaur is not in the park");
    }

    dinosaurs[dinosaurToFeedIndex].hunger = 1;

    return new Park(dinosaurs);
  }

  euthanize(dinosaur: Dinosaur): Park {
    const dinosaurs = [...this.dinosaurs];

    const dinosaurToEuthanizeIndex = dinosaurs.indexOf(dinosaur);

    return new Park([
      ...dinosaurs.slice(0, dinosaurToEuthanizeIndex),
      ...dinosaurs.slice(dinosaurToEuthanizeIndex + 1),
    ]);
  }
}

export const initiatePark = () => {
  return new Park([
    new Dinosaur("", 0.5),
    new Dinosaur("", 0.5),
  ]);
};
