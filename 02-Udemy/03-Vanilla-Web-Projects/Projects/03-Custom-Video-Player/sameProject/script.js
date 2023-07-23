// Sellecting DOM Elements:
const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

// Playing & Pausing Video:
const toggleVideoStatus = () => {
  video.paused ? video.play() : video.pause();
};

// Updating Play/Pause Icon:
const updatePlayIcon = () => {
  video.paused
    ? (play.innerHTML = '<i class="fa fa-play fa-2x"></i>')
    : (play.innerHTML = '<i class="fa fa-pause fa-2x"></i>');
};

// Updating Progress & Timestamp:
const updateProgress = () => {
  progress.value = (video.currentTime / video.duration) * 100;

  // Getting Minutes:
  let minutes = Math.floor(video.currentTime / 60);
  minutes < 10 && (minutes = "0" + String(minutes));
  // if (minutes < 10) minutes = "0" + String(minutes);

  // Getting Seconds:
  let seconds = Math.floor(video.currentTime % 60);
  seconds < 10 && (seconds = "0" + String(seconds));

  // Modifying Timestamp content:
  timestamp.innerHTML = `${minutes}:${seconds}`;
};

// Setting Video Time to Progress:
const setVideoProgress = () => {
  video.currentTime = (+progress.value * video.duration) / 100;
};

// Stoping Video:
const stopVideo = () => {
  video.currentTime = 0;
  video.pause();
};

// Event listeners:
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

// Controls listeners:
play.addEventListener("click", toggleVideoStatus);
stop.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);
