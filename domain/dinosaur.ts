export class Dinosaur {
  name: string;
  hunger: number;
  isAlive: boolean;

  constructor(name: string = "", hunger: number = 0, isAlive: boolean = true) {
    this.name = name;
    this.hunger = hunger;
    this.isAlive = isAlive;
  }
}
