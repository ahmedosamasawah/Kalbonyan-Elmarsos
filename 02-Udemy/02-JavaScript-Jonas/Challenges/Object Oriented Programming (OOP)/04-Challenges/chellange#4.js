
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going ${this.speed} km/h`);
    return this;
  }
  brake() {
    this.speed -= 10;
    console.log(`${this.make} is going ${this.speed} km/h`);
    return this;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
  }
  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
  }
}

const rivian = new EVCl("Rivian", 120, 23);
