import { assertEquals, assertThrows } from "../deps/tests.ts";

import {
  initiatePark,
  CannotBreedDinosaursNotInPark,
  CannotBreedDeadDinosaur,
  CannotFeedDinosaursNotInPark,
  CannotFeedDeadDinosaur,
  CannotEuthanize,
  Park,
} from "./park.ts";
import { Dinosaur } from "./dinosaur.ts";

Deno.test("Initial park with two dinosaurs", () => {
  const initialPark = initiatePark();

  assertEquals(initialPark?.dinosaurs?.length, 2);
});

Deno.test("Breed two dinosaurs", () => {
  let park = initiatePark();

  park = park.breed(park.dinosaurs[0], park.dinosaurs[1], "Billy");

  assertEquals(park?.dinosaurs?.length, 3);
  assertEquals(park?.dinosaurs[2]?.name, "Billy");
});

Deno.test("Cannot breed with a dinosaur not in the park", () => {
  const park = initiatePark();

  assertThrows(
    () => {
      park.breed(park.dinosaurs[0], new Dinosaur("Bob"), "Billy");
    },
    CannotBreedDinosaursNotInPark,
  );

  assertThrows(
    () => {
      park.breed(new Dinosaur("Bob"), park.dinosaurs[1], "Billy");
    },
    CannotBreedDinosaursNotInPark,
  );
});

Deno.test("Initial park with half-fed dinosaurs", () => {
  const park = initiatePark();

  assertEquals(park?.dinosaurs[0]?.hunger, 5);
  assertEquals(park?.dinosaurs[1]?.hunger, 5);
});

Deno.test("Feed a dinosaur", () => {
  let park = initiatePark();

  park = park.feed(park.dinosaurs[0]);

  assertEquals(park?.dinosaurs[0]?.hunger, 10);
});

Deno.test("Cannot feed a dinosaur not in the park", () => {
  let park = initiatePark();

  assertThrows(
    () => {
      park.feed(new Dinosaur("Samuel"));
    },
    CannotFeedDinosaursNotInPark,
  );
});

Deno.test("Euthanize a dinosaur", () => {
  let park = initiatePark();

  park = park.euthanize(park.dinosaurs[0]);

  assertEquals(park.dinosaurs[0].isAlive, false);
});

Deno.test("Euthanize the last dinosaur", () => {
  let park = initiatePark();

  park = park.euthanize(park.dinosaurs[1]);

  assertEquals(park.dinosaurs[1].isAlive, false);
});

Deno.test("Cannot euthanize a dinosaur not in the park", () => {
  let park = initiatePark();

  assertThrows(
    () => {
      park.euthanize(new Dinosaur("Michael"));
    },
    CannotEuthanize,
  );
});

Deno.test("A dead dinosaur cannot be fed", () => {
  let park = initiatePark();

  park = park.euthanize(park.dinosaurs[1]);

  assertThrows(
    () => {
      park.feed(park.dinosaurs[1]);
    },
    CannotFeedDeadDinosaur,
  );
});

Deno.test("A dead dinosaur cannot be bred", () => {
  let park = initiatePark();

  park = park.euthanize(park.dinosaurs[1]);

  assertThrows(
    () => {
      park.breed(park.dinosaurs[0], park.dinosaurs[1]);
    },
    CannotBreedDeadDinosaur,
  );
});

Deno.test("Dinosaurs getting more hungry over time", () => {
  let park = initiatePark();
  park = park.passTime();

  assertEquals(park?.dinosaurs[0]?.hunger, 4);
  assertEquals(park?.dinosaurs[1]?.hunger, 4);
});

Deno.test("Dinosaurs starving over time", () => {
  let park = initiatePark();
  for (let i = 0; i < 5; i++) {
    park = park.passTime();
  }

  assertEquals(park?.dinosaurs[0]?.isAlive, false);
  assertEquals(park?.dinosaurs[1]?.isAlive, false);
});

Deno.test("Not reducing dead dino's hunger over time", () => {
  let park = initiatePark();
  park = park.euthanize(park.dinosaurs[0]);
  for (let i = 0; i < 6; i++) {
    park = park.passTime();
  }

  assertEquals(park?.dinosaurs[0]?.hunger, 5);
});

Deno.test("Game is not over on initialization", () => {
  const park = initiatePark();
  assertEquals(park?.gameOver, false);
});

Deno.test("Game over when no dinosaurs are alive - from starvation", () => {
  let park = initiatePark();
  for (let i = 0; i < 5; i++) {
    park = park.passTime();
  }

  assertEquals(park?.gameOver, true);
});

Deno.test("Game over when no dinosaurs are alive - from euthanizing last dinosaur", () => {
  let park = initiatePark();
  park = park.euthanize(park.dinosaurs[0]);
  park = park.euthanize(park.dinosaurs[1]);
  assertEquals(park?.gameOver, true);
});

Deno.test("Game over when no dinosaurs are alive - from starting a game with no dinosaur", () => {
  const park = new Park();
  assertEquals(park?.gameOver, true);
});

Deno.test("Game over when no dinosaurs are alive - from starting a game with no living dinosaur", () => {
  const park = new Park([
    new Dinosaur("John", 12, false),
  ]);
  assertEquals(park?.gameOver, true);
});
