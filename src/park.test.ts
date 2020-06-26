import { assertEquals } from '../deps/tests.ts';

import { initiatePark } from './park.ts';

Deno.test('Initial park with two dinosaurs', () => {
    const initialPark = initiatePark();

    assertEquals(initialPark?.dinosaurs?.length, 2);
});

/*
TODO:
- Breed two dino
- Error if one of the dino is not in the park
*/
Deno.test('Breed two dinosaurs', () => {
    let park = initiatePark();

    park = park.breed(park.dinosaurs[0], park.dinosaurs[1], 'Billy');

    assertEquals(park?.dinosaurs?.length, 3);
    assertEquals(park?.dinosaurs[2]?.name, 'Billy');
});
