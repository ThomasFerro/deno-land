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

const updateDisplay = (park: Park) => {
  console.clear();
  console.log("Welcome... to Deno Park !");
  park.dinosaurs.forEach((dinosaur: Dinosaur, index: number) => {
    console.log(`[${index}] ${dinosaur.name} - ${dinosaur.hunger}`);
  });
  // console.log('Press B to breed');
  // console.log('Press E to euthanize a dinosaur');
  // console.log('Press F to feed a dinosaur');
};

let park = initiatePark();
updateDisplay(park);

setInterval(() => {
  park = park.passTime();
  updateDisplay(park);
}, 60000);

for await (const command of readLines(Deno.stdin)) {
  updateDisplay(park);
}
