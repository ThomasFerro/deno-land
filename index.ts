import { initiatePark } from "./domain/park.ts";
import { initiateCli } from "./cli/index.ts";
import { initiateHttp } from "./http/index.ts";

const park = initiatePark();
if (Deno.args.indexOf("--http") !== -1) {
  initiateHttp(park);
} else {
  initiateCli(park);
}
