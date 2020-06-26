import { assertEquals } from '../deps/tests.ts';

import { initiatePark } from './park.ts';

Deno.test('Initial park with two dinosaurs', () => {
    const initialPark = initiatePark();

    assertEquals(initialPark?.dinosaurs?.length, 2);
});
