import { assertEquals, assertThrows } from '../deps/tests.ts';

import { initiatePark, CannotBreed } from './park.ts';
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
