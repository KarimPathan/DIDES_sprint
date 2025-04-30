document.addEventListener('DOMContentLoaded', () => {
  const title = document.createElement('div');
  title.id = 'titel';
  title.className = 'titel';
  title.innerHTML = 'Montage_<br> ONEWE';
  document.body.appendChild(title);
});

const playButton = document.querySelector('.play-button');
const koreanAudio = document.querySelector('.song-korean');
const englishAudio = document.querySelector('.song-english');
const lyricsContainer = document.querySelector('.lyrics-container');
const languageOptions = document.querySelectorAll('.language-option');
const languageSwitcher = document.querySelector('.language-switcher');
const songTitle = document.querySelector('.song-title');

koreanAudio.volume = 1;
englishAudio.volume = 1;


let startTime;
let elapsedTime = 0;
let timerInterval;

let currentLanguage = 'korean';
let currentAudio = koreanAudio;
let activeLyrics = [];
let timeoutIds = [];
let lyricsUpdateHandler = null;

const lyrics = {
  korean: [

    { text: "옅은 잠결에 흐르길", start: 10, end: 13, position: 'kr3' },


    { text: "조각이 된 그 장면 ", start: 22, end: 32, position: 'kr1' },
    { text: "하나둘씩 세보아", start: 22, end: 32, position: 'kr2' },
    { text: "언제든 찾아올 수 있게", start: 22, end: 32, position: 'kr4'},

    { text: "꿈과 현실 그사이 ", start: 33, end: 42, position: 'kr1' },
    { text: "작은 경계선 즈음에", start: 33, end: 42, position: 'kr2' },

    { text: "작은 경계선 즈음에", start: 33, end: 42, position: 'kr4' },
    { text: "머물러 있어 주길 바라 나와 ", start: 33, end: 42, position: 'kr5' },,

    { text: "있잖아", start: 43, end: 53, position: 'kr1' },
    { text: "눈을 떠봐도 넌 아른거려", start: 43, end: 53, position: 'kr2' },
    { text: "네가 보고 싶은 이 밤에도", start: 43, end: 53, position: 'kr3' },
    { text: "난 또 쉽게 잠에 들지 못해", start: 43, end: 53, position: 'kr4' },


    { text: "설령 이게 거짓이어도 다가와줘", start: 53, end: 57, position: 'kr3' },

    { text: "동서남북 ", start: 58, end: 61, position: 'kr2' },
    { text: "길을 잃은 사랑", start: 58, end: 61, position: 'kr4' },
    { text: "꿈속에서 놓친 너", start: 58, end: 61, position: 'kr5' },

    { text: "이 밤이 지나가도 ", start: 62, end: 68, position: 'kr1' },
    { text: "사랑을 담아 말할게", start: 62, end: 68, position: 'kr4' },

    { text: "저 하늘 구름 사이", start: 69, end: 72, position: 'kr2' },
    { text: "너와 날 비출 때", start: 69, end: 72, position: 'kr5' },

    { text: "네가 보는 어디든", start: 72, end: 76, position: 'kr1' },
    { text: "그 자리에 서 있을게", start: 72, end: 76, position: 'kr4' },


    { text: "언제든 찾아올 수 있게", start: 78, end: 83, position: 'kr3' }




  ],


  english: [

    { text: "Hoping you flow in my light sleep", start: 10, end: 13, position: 'en3' },

    { text: "The pieces of the broken scene", start: 22, end: 32, position: 'en1' },
    { text: "let’s count them one by one", start: 22, end: 32, position: 'en2' },
    { text: "I’m trying to assemble", start: 22, end: 32, position: 'en4' },
    { text: "The blurred Montage, set back", start: 22, end: 32, position: 'en5' },


    { text: "The fine line in-between the dream and reality", start: 33, end: 42, position: 'en2' },
    { text: "I hope you come and stay with me; won’t you ", start: 33, end: 42, position: 'en4' },

    { text: "You know what ", start: 43, end: 53, position: 'en1' },
    { text: "When I open my eyes, you keep coming up ", start: 43, end: 53, position: 'en2' },
    { text: "Even on this night, when I really miss you", start: 43, end: 53, position: 'en4' },
    { text: "it’s hard for me to go to sleep", start: 43, end: 53, position: 'en5' },

    { text: "Even though it’s all a lie,please come closer to me", start: 53, end: 57, position: 'en3' },
    //{ text: "Please come closer to me", start: 53, end: 57, position: 'en5' },


    { text: "North, South, East, West", start: 58, end: 61, position: 'en2' },
    { text: "Love lost on the road", start: 58, end: 61, position: 'en3' },
    { text: "Lost in my dreams", start: 58, end: 61, position: 'en4' },

    { text: "Although the night fades away", start: 62, end: 66, position: 'en1' },
    { text: "With all my love, I’m telling you", start: 62, end: 66, position: 'en2' },

    { text: "Between the sky and the clouds", start: 67, end: 72, position: 'en4' },
    { text: "Just when it shines on us", start: 67, end: 72, position: 'en5' },

    { text: "And no matter where you look", start: 72, end: 77, position: 'en2' },
    { text: "I’ll be standing right here for you", start: 72, end: 77, position: 'en4' },


    { text: "You can come and find me whenever", start: 78, end: 83, position: 'en3' }


  ]
};

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  elapsedTime = Date.now() - startTime;
  const seconds = Math.floor(elapsedTime / 1000);
  console.log(`Elapsed time: ${seconds} seconds`);


}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
}


function updateTimer() {
  elapsedTime = Date.now() - startTime;
  const seconds = Math.floor(elapsedTime / 1000);
  document.querySelector('.timer-display').textContent = formatTime(seconds);
}

playButton.addEventListener('click', () => {
  koreanAudio.currentTime = 0;
  englishAudio.currentTime = 0;

  currentAudio.play().then(() => {
    startTimer();

    // Hide play button and background after 1 second
    setTimeout(() => {
      const playWrapper = document.querySelector('.play-button-wrapper');
      if (playWrapper) {
        playWrapper.classList.add('hidden');
      }
      
      startLyricsVisualizer();
      languageSwitcher.style.display = 'grid';
    }, 1000); // Adjust this delay as needed
    
  }).catch(error => {
    console.error("Playback failed:", error);
    alert("Audio playback failed. Please check console for details.");
  });
});

function showSongTitle() {
  songTitle.classList.add('show');
  setTimeout(() => {
    songTitle.classList.remove('show');
  }, 3000);
}


languageOptions.forEach(option => {
  option.addEventListener('click', () => {
    if (option.dataset.lang === currentLanguage) return;

    languageOptions.forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === option.dataset.lang);
    });
    
    const syncTime = currentAudio.currentTime;
    pauseTimer();  
    currentAudio.pause();
    currentLanguage = option.dataset.lang;
    const newAudio = currentLanguage === 'korean' ? koreanAudio : englishAudio;

    newAudio.currentTime = syncTime;
    elapsedTime = syncTime * 1000; 

    newAudio.play().then(() => {
      currentAudio = newAudio;
      startTimer(); 


      const titl = document.getElementById('titel');
      if (titel) {
        titel.classList.toggle('english', currentLanguage === 'english');
        titl.classList.toggle('korean', currentLanguage === 'korean');
      }

      languageOptions.forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === currentLanguage);
      });

      clearAllLyrics();
      startLyricsVisualizer();
    });
  });
});

languageOptions.forEach(option => {
  option.addEventListener('mouseenter', () => {
      if (!option.classList.contains('active')) {
          option.classList.add('hover-effect');
      }
  });
  
  option.addEventListener('mouseleave', () => {
      option.classList.remove('hover-effect');
  });
});

let lastUpdate = 0;
function startLyricsVisualizer() {
  if (lyricsUpdateHandler) {
    currentAudio.removeEventListener('timeupdate', lyricsUpdateHandler);
  }
  
  lyricsUpdateHandler = () => {
    const now = Date.now();
    if (now - lastUpdate > 100) { 
      showCurrentLyrics();
      lastUpdate = now;
    }
  };
  
  currentAudio.addEventListener('timeupdate', lyricsUpdateHandler);
  showCurrentLyrics();
}

function showCurrentLyrics() {
  const currentTime = currentAudio.currentTime;
  
  activeLyrics.forEach(lyricEl => {
    const shouldKeep = lyrics[currentLanguage].some(l => 
      l.text === lyricEl.textContent && 
      currentTime >= l.start && 
      currentTime <= l.end
    );
    
    if (!shouldKeep) {
      clearTimeout(timeoutIds[activeLyrics.indexOf(lyricEl)]);
      lyricEl.classList.remove('show');
      /*setTimeout(() => lyricEl.remove(), 300);*/
      lyricEl.remove()
      activeLyrics = activeLyrics.filter(l => l !== lyricEl);
    }
  });
  
  lyrics[currentLanguage].forEach(lyric => {
    const shouldShow = currentTime >= lyric.start && currentTime <= lyric.end;
    const isShowing = activeLyrics.some(el => el.textContent === lyric.text);
    
    if (shouldShow && !isShowing) {
      displayLyric(lyric.text, lyric.position, lyric.end - currentTime);
    }
  });
}

function displayLyric(text, position, duration) {
  const lyricElement = document.createElement('div');
  lyricElement.className = `lyric ${position} ${currentLanguage === 'english' ? 'english' : ''}`;
  lyricElement.textContent = text;
  lyricsContainer.appendChild(lyricElement);
  
  const randomTime = 5 + Math.random() * 5;
  lyricElement.style.animationDuration = `${randomTime}s`;
  void lyricElement.offsetWidth;
  lyricElement.classList.add('show');

  const timeoutId = setTimeout(() => {
    lyricElement.classList.remove('show');
    setTimeout(() => lyricElement.remove(), 300);
  }, duration * 1000);

  activeLyrics.push(lyricElement);
  timeoutIds.push(timeoutId);
}

function clearAllLyrics() {
  timeoutIds.forEach(id => clearTimeout(id));
  timeoutIds = [];

  activeLyrics.forEach(lyric => {
    lyric.classList.remove('show');
    /*setTimeout(() => lyric.remove(), 300);*/
    lyric.remove()
  });
  activeLyrics = [];
}

koreanAudio.load();
englishAudio.load();