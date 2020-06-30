import { initiatePark } from "./domain/park.ts";
import { initiateCli } from "./cli/index.ts";

const park = initiatePark();
initiateCli(park);
