const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

const checkDogs = function (juliaArr, kateArr) {
  const juliaArrCorrected = juliaArr.slice(1, -2);

  console.log(juliaArrCorrected);

  const allDogs = juliaArrCorrected.concat(kateArr);

  allDogs.forEach(function (dog, i) {
    dog >= 3
      ? console.log(`Dog number ${i + 1} is an adult and is ${dog} years old`)
      : console.log(
          `Dog number ${i + 1} is still a puppy and is ${dog} years old`
        );
  });
};

checkDogs(dogsJulia, dogsKate);
