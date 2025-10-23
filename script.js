const playBtn = document.querySelector('.player-control img:nth-child(3)');
const prevBtn = document.querySelector('.player-control img:nth-child(2)');
const nextBtn = document.querySelector('.player-control img:nth-child(4)');
const progressBar = document.querySelector('.progress-bar');
const currTime = document.querySelector('.curr-time');
const totalTime = document.querySelector('.total-time');
const volumeBar = document.querySelector('.volume');
const likeBtn = document.querySelector('.like');
const songCardsContainer = document.getElementById('songCards');

// Song info in bottom player
const songTitle = document.querySelector('.music p:first-child');
const songArtist = document.querySelector('#singer');
const songImage = document.querySelector('.music img');

//song list
let songs = [
  {
    title: "Jashn-E-Bahaaraa",
    artist: "A.R. Rahman, Javed Ali",
    src: "assets/songs/1.mp3",
    img: "assets/imgs/1.jpg"
  },
  {
    title: "बन्नी री लाल बंगड़ी",
    artist: "Fakira Khan",
    src: "assets/songs/2.mp3",
    img: "assets/imgs/2.jpg"
  },
  {
    title: "Bas Ek Baar",
    artist: "Soham Naik",
    src: "assets/songs/3.mp3",
    img: "assets/imgs/3.jpg"
  },
  {
    title: "In Aankho Ki Masti",
    artist: "Asha Bhosle",
    src: "assets/songs/4.mp3",
    img: "assets/imgs/4.jpg"
  },
  {
    title: "O Beliya",
    artist: "Darshan Raval",
    src: "assets/songs/5.mp3",
    img: "assets/imgs/5.jpg"
  },
  {
    title: "Mahiye Jinna Sohna",
    artist: "Darshan Raval",
    src: "assets/songs/6.mp3",
    img: "assets/imgs/6.jpeg"
  }
];

let currentSongIndex = 0;
let audio = new Audio(songs[currentSongIndex].src); //use mdn reference for audio
let isPlaying = false;

function updateSongDetails() {
  const song = songs[currentSongIndex];
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  songImage.src = song.img;
  audio.src = song.src;
  if (isPlaying) audio.play();
}

function togglePlay() {
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
    playBtn.src = "assets/player_icon6.jpg";
  } else {
    audio.pause();
    isPlaying = false;
    playBtn.src = "assets/player_icon3.png";
  }
}
playBtn.addEventListener("click", togglePlay);

nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongDetails();
  isPlaying = true;
  playBtn.src = "assets/player_icon4.png";
});
prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongDetails();
  isPlaying = true;
  playBtn.src = "assets/player_icon4.png";
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    const mins = Math.floor(audio.currentTime / 60);
    const secs = String(Math.floor(audio.currentTime % 60)).padStart(2, "0");
    currTime.textContent = `${mins}:${secs}`;
    const tM = Math.floor(audio.duration / 60);
    const tS = String(Math.floor(audio.duration % 60)).padStart(2, "0");
    totalTime.textContent = `${tM}:${tS}`;
  }
});
progressBar.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  }
});
volumeBar.addEventListener("input", () => (audio.volume = volumeBar.value / 100));
audio.addEventListener("ended", () => nextBtn.click());

likeBtn.addEventListener("click", () => {
  likeBtn.classList.toggle("fa-solid");
  likeBtn.classList.toggle("fa-regular");
  likeBtn.style.color = likeBtn.classList.contains("fa-solid") ? "#1bd670" : "";
});

function loadSongCards() {
  songs.forEach((song, index) => {
    if (index === 5) return;
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${song.img}" alt="${song.title}" class="card-img">
      <p class="card-title">${song.title}</p>
      <p class="card-info">${song.artist}</p>
    `;
    card.addEventListener("click", () => {
      currentSongIndex = index;
      updateSongDetails();
      isPlaying = true;
      playBtn.src = "assets/player_icon4.png";
    });
    songCardsContainer.appendChild(card);
  });
}

const staticCard = document.querySelector(".static-card");
if (staticCard) {
  staticCard.addEventListener("click", () => {
    currentSongIndex = 5; 
    updateSongDetails();
    isPlaying = true;
    playBtn.src = "assets/player_icon4.png";
  });
}

updateSongDetails();
loadSongCards();
