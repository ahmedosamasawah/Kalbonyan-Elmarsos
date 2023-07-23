const swap = document.getElementById("swap");
const rateElement = document.getElementById("rate");
const amountElementOne = document.getElementById("amount-one");
const amountElementTwo = document.getElementById("amount-two");
const currencyElementOne = document.getElementById("currency-one");
const currencyElementTwo = document.getElementById("currency-two");

// Fetching Data from API
const calculate = () => {
  const currencyOne = currencyElementOne.value;
  const currencyTwo = currencyElementTwo.value;

  fetch(`https://open.exchangerate-api.com/v6/latest/${currencyOne}`)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.rates[currencyTwo].toFixed(2);

      rateElement.innerText = ` 1 ${currencyOne} = ${rate} ${currencyTwo}`;

      amountElementTwo.value = (rate * amountElementOne.value).toFixed(2);
    });
};

// Event Listeners
currencyElementOne.addEventListener("change", calculate);
amountElementOne.addEventListener("input", calculate);
currencyElementTwo.addEventListener("change", calculate);
amountElementTwo.addEventListener("input", calculate);
swap.addEventListener("click", () => {
  const temp = currencyElementOne.value;
  currencyElementOne.value = currencyElementTwo.value;
  currencyElementTwo.value = temp;
  calculate();
});
