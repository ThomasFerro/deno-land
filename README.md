# Deno Park

> [Welcome... to Deno Park !](https://www.youtube.com/watch?v=-w-58hQ9dLk)

## Development workflow

- Run the tests: `deno test .`;
- Run the application (CLI): `deno run index.ts`;
- Run the application (HTTP): `deno run --allow-net index.ts --http`

## HTTP API examples

- Get park information: `curl http://localhost:8000`;
- Feed a dinosaur: `curl -X POST http://localhost:8000/feed?dinosaur=0`;