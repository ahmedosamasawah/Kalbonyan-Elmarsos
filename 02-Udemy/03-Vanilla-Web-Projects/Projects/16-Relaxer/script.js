const text = document.getElementById("text");
const container = document.getElementById("container");

const totalTime = 7500;
const holdTime = totalTime / 5;
const breatheTime = (totalTime / 5) * 2;

breathAnimation();

function breathAnimation() {
  text.innerText = "Breathe In!";
  container.className = "container grow";

  setTimeout(() => {
    text.innerText = "Hold";

    setTimeout(() => {
      text.innerText = "Breathe Out!";
      container.className = "container shrink";
    }, holdTime);
  }, breatheTime);
}

setInterval(breathAnimation, totalTime);
