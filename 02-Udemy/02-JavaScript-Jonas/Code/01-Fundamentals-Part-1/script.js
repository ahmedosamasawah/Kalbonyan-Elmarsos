/*
// // // // // 
let courseName = "JavaScript";
console.log(50 + 12 + 3 - 20);
// // // // // 


// // // // // 
console.log("Ahmed");
console.log(20);

let firstName = "Sawah";

console.log(firstName);
// // // // //


// // // // // 
let Ahmed_Osama = "AO";
let $function = 20;

let person = "Osama";
let PI = 3.1415;

let myFirstJob = "Student";
let myCurrentJob = "Programmer";

let job1 = "Student";
let job2 = "Programmer";

console.log(myFirstJob);
// // // // // 


// // // // // 
let javascriptIsFun = true;
console.log(javascriptIsFun);

console.log(typeof javascriptIsFun);

javascriptIsFun = 'YES!';
console.log(typeof javascriptIsFun);

let year;
console.log(year);
console.log(typeof year);

year = 2002;
console.log(typeof year);

console.log(typeof null);
// // // // // 


// // // // // 
let age = 20;
age = 20;

const birthYear = 2002;

var job = 'Programmer';
job = 'Student'

lastName = 'Osama';
console.log(lastName);
// // // // // 


// // // // // 
const now = 2022;
const ageAhmed = now - 2002;
const ageFatema = now - 2019;
console.log(ageAhmed, ageFatema);

console.log(ageAhmed * 2, ageAhmed / 5, 3 ** 3);

const firstName = 'Ahmed';
const lastName = 'Osama';
console.log(firstName + ' ' + lastName);
// // // // // 


// // // // // 
let x = 20 + 5; // 25
x += 5; // x = x + 5 = 30
x *= 2; // x = x * 2 = 60
x++; // x = x + 1
x--;
x--;
console.log(x);
// // // // // 


// // // // // 
console.log(ageAhmed > ageFatema);
console.log(ageFatema >= 18);

const isFullAge = ageFatema >= 18;

console.log(now - 2002 > now - 2019);
// // // // // 


// // // // // 
const now = 2022;
const ageJonas = now - 2002;
const ageSarah = now - 2019;

console.log(now - 2002 > now - 2019);

let x, y;
x = y = 25 - 10 - 5; 
console.log(x, y);

const averageAge = (ageAhmed + ageFatema) / 2;
console.log(ageAhmed, ageFatema, averageAge);
// // // // // 
*/

// // // // // // // // // // // //

// // // // //
/*
const firstName = 'Ahmed';
const job = 'Coder';
const birthYear = 2002;
const year = 2022;

const Ahmed = "I'm " + firstName + ', a ' + (year - birthYear) + ' year old ' + job + '!';
console.log(Ahmed);

const AhmedNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;
console.log(AhmedNew);

console.log(`Just a regular string...`);

console.log(`1st Line
2nd Line
3rd Line`);
// // // // //


// // // // //
const age = 20;

if (age >= 18) {
  console.log('Ahmed can start driving license 🚗');
} else {
  const yearsLeft = 18 - age;
  console.log(`Ahmed is too young. Wait another ${yearsLeft} years :)`);
}

const birthYear = 2002;

let century;
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);
*/
// // // // //

// // // // // // // // // // // //

/*
// // // // //
const inputYear = '2002';
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

console.log(Number('Ahmed'));
console.log(typeof NaN);

console.log(String(20), 20);


console.log('I am ' + 20 + ' years old');
console.log('20' - '8' - 1);
console.log('20' / '2');

let n = '1' + 1; // '11'
n = n - 1;
console.log(n);
// // // // //


// // // // //
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('Jonas'));
console.log(Boolean({}));
console.log(Boolean(''));

const money = 100;
if (money) {
  console.log("Don't spend it all ;)");
} else {
  console.log('You should get a job!');
}

let height = 0;
if (height) {
  console.log('YAY! Height is defined');
} else {
  console.log('Height is UNDEFINED');
}
// // // // //


// // // // //
const age = '18';
if (age === 18) console.log('You just became an adult :D (strict)');

if (age == 18) console.log('You just became an adult :D (loose)');


const favourite = Number(prompt("What's your favourite number?"));
console.log(favourite);
console.log(typeof favourite);

if (favourite === 23) {
  console.log('Cool! 23 is an amzaing number!')
} else if (favourite === 7) {
  console.log('7 is also a cool number')
} else if (favourite === 9) {
  console.log('9 is also a cool number')
} else {
  console.log('Number is not 23 or 7 or 9')
}

if (favourite !== 23) console.log('Why not 23?');
// // // // //


// // // // //
const hasDriversLicense = true;
const hasGoodVision = true; 
const isTired = false;

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);
console.log(hasDriversLicense && hasGoodVision && isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log('Ahmed is able to drive!');
} else {
  console.log('Someone else should drive...');
}
*/
// // // // //

// // // // // // // // // // // //

/*
// // // // //
const day = 'friday';

switch (day) {
  case 'monday':
    console.log('Plan course structure');
    console.log('Go to coding meetup');
    break;
  case 'tuesday':
    console.log('Prepare challenge videos');
    break;
  case 'wednesday':
  case 'thursday':
    console.log('Write code examples');
    break;
  case 'friday':
    console.log('Record videos');
    break;
  case 'saturday':
  case 'sunday':
    console.log('Enjoy the weekend :D');
    break;
  default:
    console.log('Not a valid day!');
}

if (day === 'monday') {
  console.log('Plan course structure');
  console.log('Go to coding meetup');
} else if (day === 'tuesday') {
  console.log('Prepare theory videos');
} else if (day === 'wednesday' || day === 'thursday') {
  console.log('Write code examples');
} else if (day === 'friday') {
  console.log('Record videos');
} else if (day === 'saturday' || day === 'sunday') {
  console.log('Enjoy the weekend :D');
} else {
  console.log('Not a valid day!');
}
// // // // //


// // // // //
if (23 > 10) {
  const str = '23 is bigger';
}

const me = 'Ahmed';
console.log(`I'm ${2022 - 2002} years old, and my name is ${me}`);
// // // // //


// // // // //
const age = 20;

console.log(`I like to drink ${age >= 18 ? 'coffee ☕' : 'water 💧'}`);
// // // // //
*/
