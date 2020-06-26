import { assertEquals, assertThrows } from '../deps/tests.ts';

import { initiatePark, CannotBreed, CannotFeed } from './park.ts';
import { Dinosaur } from './dinosaur.ts';

Deno.test('Initial park with two dinosaurs', () => {
    const initialPark = initiatePark();

    assertEquals(initialPark?.dinosaurs?.length, 2);
});

Deno.test('Breed two dinosaurs', () => {
    let park = initiatePark();

    park = park.breed(park.dinosaurs[0], park.dinosaurs[1], 'Billy');

    assertEquals(park?.dinosaurs?.length, 3);
    assertEquals(park?.dinosaurs[2]?.name, 'Billy');
});

Deno.test('Cannot breed with a dinosaur not in the park', () => {
    const park = initiatePark();

    assertThrows(
        () => {
            park.breed(park.dinosaurs[0], new Dinosaur('Bob'), 'Billy');
        },
        CannotBreed,
    );

    assertThrows(
        () => {
            park.breed(new Dinosaur('Bob'), park.dinosaurs[1], 'Billy');
        },
        CannotBreed,
    );
});

Deno.test('Initial park with half-fed dinosaurs', () => {
    const park = initiatePark();

    assertEquals(park?.dinosaurs[0]?.hunger, 0.5);
    assertEquals(park?.dinosaurs[1]?.hunger, 0.5);
});

Deno.test('Feed a dinosaur', () => {
    let park = initiatePark();

    park = park.feed(park.dinosaurs[0]);

    assertEquals(park?.dinosaurs[0]?.hunger, 1);
});

Deno.test('Cannot feed a dinosaur not in the park', () => {
    let park = initiatePark();

    assertThrows(
        () => {
            park.feed(new Dinosaur('Samuel'));
        },
        CannotFeed,
    );
});
