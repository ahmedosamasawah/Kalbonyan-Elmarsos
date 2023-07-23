const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going ${this.speed} km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 10;
  console.log(`${this.make} is going ${this.speed} km/h`);
};

//-------------  1) Create a new EV

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
// connect the prototype chain
EV.prototype = Object.create(Car.prototype);
//  we want the EV  prototype property to inherit the Car prototype
// so we create new object that its prototype is Car.prototype

// fix the constructor problem
EV.prototype.constructor = EV;

//------------- 2) Implement te chargeBattery method
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

//-------------- 3) Implement an
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

//-------------- 4) create new tesla car
const tesla = new EV("Tesla", 120, 23);
tesla.chargeBattery(90);
tesla.brake();
tesla.accelerate();
// the child class can override a method from the parent class
