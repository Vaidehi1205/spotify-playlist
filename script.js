console.log("Spotify Loaded");

let songIndex = 0;
let audioElement = new Audio("Perfect.mp3");

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
    { songName: "Perfect", filePath: "./Perfect.mp3", coverPath: "./po1.jpeg" },
    { songName: "Promise", filePath: "./Promise.mp3", coverPath: "./po2.webp" },
    { songName: "Dooron Dooron", filePath: "./Dooron Dooron.mp3", coverPath: "./po3.webp" },
    { songName: "Samjho Na", filePath: "./SAMJHO NA.mp3", coverPath: "./po4.webp" },
    { songName: "Arz Kiya Hai", filePath: "./Arz Kiya Hai.mp3", coverPath: "./po5.webp" },
    { songName: "Ehsaas", filePath: "./Ehsaas.mp3", coverPath: "./po6.webp" },
    { songName: "Kashish", filePath: "./Kashish.mp3", coverPath: "./po7.webp" },
    { songName: "Gabriela", filePath: "./Gabriela.mp3", coverPath: "./po8.jpg" },
    { songName: "We Don't Talk Anymore", filePath: "./s9.mp3", coverPath: "./po9.webp" },
    { songName: "Attention", filePath: "./Attention.mp3", coverPath: "./po10.webp" },
];

// Load songs
songItems.forEach((item, i) => {
    item.querySelector("img").src = songs[i].coverPath;
    item.querySelector(".songName").innerText = songs[i].songName;
});

// Reset active song styling
function resetActive() {
    songItems.forEach(item => {
        item.classList.remove("active-song");
        item.querySelector(".equalizer").style.display = "none";
    });
}

// Play / Pause toggle
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
    myProgressBar.value = parseInt((audioElement.currentTime / audioElement.duration) * 100);
});

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Play from list
songButtons.forEach((btn, idx) => {
    btn.addEventListener("click", () => playSong(idx));
});

function playSong(i) {
    songIndex = i;
    audioElement.src = songs[i].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.replace("fa-play", "fa-pause");

    resetActive();
    songItems[i].classList.add("active-song");
    songItems[i].querySelector(".equalizer").style.display = "block";
    bannerImage.src = songs[i].coverPath;
}

// Next & Previous
document.getElementById("next").addEventListener("click", nextSong);
document.getElementById("prev").addEventListener("click", prevSong);

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
}

// Shuffle
shuffleBtn.addEventListener("click", () => {
    songIndex = Math.floor(Math.random() * songs.length);
    playSong(songIndex);
});

// Repeat
repeatBtn.addEventListener("click", () => {
    audioElement.currentTime = 0;
    audioElement.play();
});

// Auto next
audioElement.addEventListener("ended", nextSong);

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

// FIXED SERVICE WORKER PATH
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js")
            .then(reg => console.log("Service Worker registered:", reg.scope))
            .catch(err => console.log("SW registration failed:", err));
    });
}
