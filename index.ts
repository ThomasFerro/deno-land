import { initiatePark } from "./domain/park.ts";
import { initiateCli } from "./cli/index.ts";

const park = initiatePark();
if (Deno.args.indexOf('--http') !== -1) {
  console.log('UNIMPLEMENTED');
} else {
  initiateCli(park);
}

