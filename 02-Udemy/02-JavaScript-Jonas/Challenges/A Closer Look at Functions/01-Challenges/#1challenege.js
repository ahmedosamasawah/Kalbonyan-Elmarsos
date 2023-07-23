
const poll = {
  question: "What is your favorite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = prompt(
      `${this.question} \n ${this.options.join("\n")} \n (write option number)`
    );

    // register answer
    // typeof answer === "number" &&
    //   answer < this.answers.length &&
    //   this.answers[answer]++;
    if (typeof answer === "number" && answer < this.answers[answer]) {
      this.answers[answer]++;
    }

    this.displayResults();
  },

  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answer);
    } // Poll results are 13, 2, 4, 1
    else if (type === "string") {
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  },
};

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

// bonus
poll.displayResults.call({ answers: [5, 2, 3] }, "string");
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, "string");
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
// [5, 2, 3]
// [1, 5, 3, 9, 6, 1]
