import { readLines } from "./deps/stdin.ts";
import { initiatePark, Park } from "./domain/park.ts";
import { Dinosaur } from "./domain/dinosaur.ts";

/*
TODO:
- Breed
- Feed
- Euthanize
- Game over display
*/

interface Command {
  message: string;
  handler: (park: Park, payload: string) => Park;
}
interface Commands {
  [commandName: string]: Command;
}
const commands: Commands = {
  "B": {
    message:
      'Type B <first dino> <second dino> <name> to breed (eg: "B 0 1 Sam" to breed the first two dinosaurs and name the new one "Sam")',
    handler: (park: Park, payload: string): Park => {
      const [_, firstDeno, secondDeno, name] = payload.split(" ");
      return park.breed(
        park.dinosaurs[Number(firstDeno)],
        park.dinosaurs[Number(secondDeno)],
        name,
      );
    },
  },
  "E": {
    message:
      'Type E <dino> to euthanize a dinosaur (eg: "E 1" to euthanize the dinosaur at index 1)',
    handler: (park: Park, payload: string): Park => {
      const [_, index] = payload.split(" ");
      return park.euthanize(park.dinosaurs[Number(index)]);
    },
  },
  "F": {
    message:
      'Type F <dino> to feed a dinosaur (eg: "F 2" to feed the dinosaur at index 2)',
    handler: (park: Park, payload: string): Park => {
      const [_, index] = payload.split(" ");
      return park.feed(park.dinosaurs[Number(index)]);
    },
  },
};

const updateDisplay = (park: Park) => {
  console.clear();
  console.log("Welcome... to Deno Park !");
  park.dinosaurs.forEach((dinosaur: Dinosaur, index: number) => {
    console.log(
      `[${index}] ${
        dinosaur.isAlive
          ? "🙂"
          : "💀"
      } ${dinosaur.name} - ${dinosaur.hunger}`,
    );
  });
  Object
    .values(commands)
    .forEach(({ message }) => console.log(message));
};

let park = initiatePark();
updateDisplay(park);

setInterval(() => {
  park = park.passTime();
  updateDisplay(park);
}, 6000);

for await (const command: string of readLines(Deno.stdin)) {
  let error = null;
  if (command && command.length > 0 && commands[command[0]]) {
    try {
      park = commands[command[0]].handler(park, command);
    } catch (e) {
      error = e.message;
    }
  }
  updateDisplay(park);
  if (error) {
    console.log("Error:", error);
  }
}
