/*
Coding Challenge #1

Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
A team ONLY wins if it has at least DOUBLE the average score of the other team. Otherwise, no team wins!

1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function 'checkWinner' that takes the average score of each team as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner to the console, together with the victory points, according to the rule above. Example: "Koalas win (30 vs. 13)".
4. Use the 'checkWinner' function to determine the winner for both DATA 1 and DATA 2.
5. Ignore draws this time.

TEST DATA 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
TEST DATA 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27

HINT: To calculate average of 3 values, add them all together and divide by 3
HINT: To check if number A is at least double number B, check for A >= 2 * B. Apply this to the team's average scores 😉

GOOD LUCK 😀
*/

// Test 1
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

const dolphinsScoreAverage = calcAverage(44, 23, 71);
const koalasScoreAverage = calcAverage(65, 54, 49);

const checkWinner = (avgDolphins, avgKoalas) => {
  if (avgDolphins >= avgKoalas * 2) {
    return `The Dolphins wins the competition by ${avgDolphins} average score`;
  } else if (avgKoalas >= avgDolphins * 2) {
    return `The Koalas wins the competition by ${avgKoalas} average score`;
  } else {
    return "No one wins the competition";
  }
};
console.log(checkWinner(dolphinsScoreAverage, koalasScoreAverage));

/*
// Test 2
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

const dolphinsScoreAverage = calcAverage(85, 54, 41);
const koalasScoreAverage = calcAverage(23, 34, 27);

const checkWinner = (avgDolphins, avgKoalas) => {
  if (avgDolphins >= avgKoalas * 2) {
    return `The Dolphins wins the competition by ${avgDolphins} average score`;
  } else if (avgKoalas >= avgDolphins * 2) {
    return `The Koalas wins the competition by ${avgKoalas} average score`;
  } else {
    return "No one wins the competition";
  }
};

console.log(checkWinner(dolphinsScoreAverage, koalasScoreAverage));
*/
