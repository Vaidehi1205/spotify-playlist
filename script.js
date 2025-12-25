console.log("DiTunes Loaded");

let songIndex = 0;

// ✅ URL-ENCODED PATH
let audioElement = new Audio("Dooron%20Dooron.mp3");

let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let volumeControl = document.getElementById("volumeControl");
let muteBtn = document.getElementById("muteBtn");

let shuffleBtn = document.getElementById("shuffle");
let repeatBtn = document.getElementById("repeat");

let bannerImage = document.getElementById("bannerImage");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songButtons = Array.from(document.getElementsByClassName("songPlayBtn"));

let songs = [
  { songName: "Dooron Dooron", filePath: "Dooron%20Dooron.mp3", coverPath: "po4.webp" },
  { songName: "Ehsaas", filePath: "Ehsaas.mp3", coverPath: "po5.webp" },
  { songName: "Kashish", filePath: "Kashish.mp3", coverPath: "po6.webp" },
  { songName: "Arziyaan", filePath: "Arziyaan.mp3", coverPath: "po1.webp" }, // ✅ FIXED
  { songName: "Bairiyaa", filePath: "Bairiyaa.mp3", coverPath: "po2.webp" },
  { songName: "Haseen", filePath: "Haseen.mp3", coverPath: "po3.webp" },
  { songName: "Hope", filePath: "Hope.mp3", coverPath: "po7.webp" },
  { songName: "I'm Done", filePath: "I_M_Done.mp3", coverPath: "po7.webp" },
  { songName: "Mera Mann", filePath: "Mera%20Mann.mp3", coverPath: "po9.webp" },
  { songName: "Pal Pal", filePath: "Pal%20Pal.mp3", coverPath: "po10.webp" },
  { songName: "Preet Re", filePath: "Preet%20Re.mp3", coverPath: "po11.webp" },
  { songName: "Samjhawan", filePath: "Samjhawan.mp3", coverPath: "po12.webp" },
  { songName: "Soniyo", filePath: "Soniyo.mp3", coverPath: "po13.webp" },
  { songName: "Zaalima", filePath: "Zaalima.mp3", coverPath: "po14.webp" },
  { songName: "Zaroor", filePath: "Zaroor.mp3", coverPath: "po15.webp" }
];

// Load song list
songItems.forEach((item, i) => {
  item.querySelector("img").src = songs[i].coverPath;
  item.querySelector(".songName").innerText = songs[i].songName;
});

// Reset active UI
function resetActive() {
  songItems.forEach(item => {
    item.classList.remove("active-song");
    const eq = item.querySelector(".equalizer");
    if (eq) eq.style.display = "none";
  });
}

// Play / Pause
function togglePlay() {
  if (audioElement.paused) {
    audioElement.play();
    masterPlay.classList.replace("fa-play", "fa-pause");
  } else {
    audioElement.pause();
    masterPlay.classList.replace("fa-pause", "fa-play");
  }
}

masterPlay.addEventListener("click", togglePlay);
bannerImage.addEventListener("click", togglePlay);

// Progress bar
audioElement.addEventListener("timeupdate", () => {
  if (!isNaN(audioElement.duration)) {
    myProgressBar.value = (audioElement.currentTime / audioElement.duration) * 100;
  }
});

myProgressBar.addEventListener("input", () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Play selected song
function playSong(i) {
  songIndex = i;
  audioElement.src = songs[i].filePath;
  audioElement.currentTime = 0;
  audioElement.play();

  masterPlay.classList.replace("fa-play", "fa-pause");

  resetActive();
  songItems[i].classList.add("active-song");
  bannerImage.src = songs[i].coverPath;
}

songButtons.forEach((btn, i) => {
  btn.addEventListener("click", () => playSong(i));
});

// Next / Prev
document.getElementById("next").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  playSong(songIndex);
});

document.getElementById("prev").addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSong(songIndex);
});

// Shuffle
shuffleBtn.addEventListener("click", () => {
  playSong(Math.floor(Math.random() * songs.length));
});

// Repeat
repeatBtn.addEventListener("click", () => {
  audioElement.currentTime = 0;
  audioElement.play();
});

// Auto next
audioElement.addEventListener("ended", () => {
  songIndex = (songIndex + 1) % songs.length;
  playSong(songIndex);
});

// Volume
audioElement.volume = volumeControl.value / 100;
volumeControl.addEventListener("input", () => {
  audioElement.volume = volumeControl.value / 100;
});

// Mute
muteBtn.addEventListener("click", () => {
  audioElement.muted = !audioElement.muted;
  muteBtn.classList.toggle("fa-volume-xmark");
  muteBtn.classList.toggle("fa-volume-high");
});

// ✅ Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js")
      .then(reg => console.log("SW registered:", reg.scope))
      .catch(err => console.error("SW failed:", err));
  });
}
