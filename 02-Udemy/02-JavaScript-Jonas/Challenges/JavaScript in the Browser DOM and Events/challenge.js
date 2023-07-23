document.querySelector('.again').addEventListener("click", () => {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  document.querySelector('.message').textContent = "Start Guessing.."
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = "?";
  document.querySelector('.guess').value = "";

  document.querySelector('body').style.backgroundColor = "#222";
  document.querySelector('.number').style.width = "15rem";


})