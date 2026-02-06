// Initialize configuration
// Expecting a global config object defined before this script runs.
const config = window.VALENTINE_CONFIG || {};

// --- User-provided defaults (applied if missing) ---
const DEFAULTS = {
  pageTitle: "Valentine 💖",
  valentineName: "Tiklu",
  questions: {
    first: {
      text: "Do I still give you butterflies?",
      yesBtn: "Yes ❤️",
      noBtn: "No 🙈",
      secretAnswer: "Secret Answer 😏",
    },
    second: {
      text: "What does “forever” look like to you right now?",
      startText: "Start 💌",
      nextBtn: "Next ➜",
    },
    third: {
      text: "Will you be my valentine?",
      yesBtn: "Yes!! 💘",
      noBtn: "No 😭",
    },
  },
  music: {
    enabled: true,
    autoplay: true,          // set true if you want it to attempt autoplay
    // Add your audio file path/URL here. For example: "assets/dooron-dooron.mp3"
    // Note: Browsers require a direct audio file URL (mp3/ogg), not a YouTube link.
    musicUrl: "dooron_dooron.mp3",
    volume: 0.5,
  },
};

// Validate configuration
function validateConfig() {
  const warnings = [];

  // Ensure nested objects exist
  config.colors = config.colors || {};
  config.animations = config.animations || {};
  config.questions = config.questions || {};
  config.questions.first = config.questions.first || {};
  config.questions.second = config.questions.second || {};
  config.questions.third = config.questions.third || {};
  config.floatingEmojis = config.floatingEmojis || { hearts: [], bears: [] };
  config.loveMessages = config.loveMessages || {};
  config.celebration = config.celebration || {};
  config.music = config.music || {};

  // Apply required defaults based on user request
  config.pageTitle = config.pageTitle || DEFAULTS.pageTitle;
  config.valentineName = config.valentineName || DEFAULTS.valentineName;

  // Force the 3 Valentine questions requested by the user (only if missing)
  config.questions.first.text = config.questions.first.text || DEFAULTS.questions.first.text;
  config.questions.second.text = config.questions.second.text || DEFAULTS.questions.second.text;
  config.questions.third.text = config.questions.third.text || DEFAULTS.questions.third.text;

  // Fill button labels if missing
  config.questions.first.yesBtn = config.questions.first.yesBtn || DEFAULTS.questions.first.yesBtn;
  config.questions.first.noBtn = config.questions.first.noBtn || DEFAULTS.questions.first.noBtn;
  config.questions.first.secretAnswer =
    config.questions.first.secretAnswer || DEFAULTS.questions.first.secretAnswer;

  config.questions.second.startText = config.questions.second.startText || DEFAULTS.questions.second.startText;
  config.questions.second.nextBtn = config.questions.second.nextBtn || DEFAULTS.questions.second.nextBtn;

  config.questions.third.yesBtn = config.questions.third.yesBtn || DEFAULTS.questions.third.yesBtn;
  config.questions.third.noBtn = config.questions.third.noBtn || DEFAULTS.questions.third.noBtn;

  // Music defaults (Dooron Dooron)
  // NOTE: You must host/provide a direct audio file (mp3/ogg) at config.music.musicUrl
  config.music.enabled = typeof config.music.enabled === "boolean" ? config.music.enabled : DEFAULTS.music.enabled;
  config.music.autoplay = typeof config.music.autoplay === "boolean" ? config.music.autoplay : DEFAULTS.music.autoplay;
  config.music.musicUrl = config.music.musicUrl || DEFAULTS.music.musicUrl;
  config.music.volume = typeof config.music.volume === "number" ? config.music.volume : DEFAULTS.music.volume;

  // Validate colors (only if provided)
  const isValidHex = (hex) => typeof hex === "string" && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  Object.entries(config.colors).forEach(([key, value]) => {
    if (!isValidHex(value)) {
      warnings.push(`Invalid color for ${key}! Using default.`);
      config.colors[key] = getDefaultColor(key);
    }
  });

  // Validate animation values
  const floatDurationNum = parseFloat(config.animations.floatDuration);
  if (!Number.isFinite(floatDurationNum) || floatDurationNum < 5) {
    warnings.push("Float duration too short/invalid! Setting to 5s minimum.");
    config.animations.floatDuration = "5s";
  }

  if (
    typeof config.animations.heartExplosionSize !== "number" ||
    config.animations.heartExplosionSize < 1 ||
    config.animations.heartExplosionSize > 3
  ) {
    warnings.push("Heart explosion size should be between 1 and 3! Using default.");
    config.animations.heartExplosionSize = 1.5;
  }

  // Log warnings if any
  if (warnings.length > 0) {
    console.warn("⚠️ Configuration Warnings:");
    warnings.forEach((warning) => console.warn("- " + warning));
  }
}

// Default color values
function getDefaultColor(key) {
  const defaults = {
    backgroundStart: "#ffafbd",
    backgroundEnd: "#ffc3a0",
    buttonBackground: "#ff6b6b",
    buttonHover: "#ff8787",
    textColor: "#ff4757",
  };
  return defaults[key];
}

// Set page title
document.title = config.pageTitle || DEFAULTS.pageTitle;

// Initialize the page content when DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  // Validate configuration first
  validateConfig();

  // Set texts from config
  const titleEl = document.getElementById("valentineTitle");
  if (titleEl) titleEl.textContent = `${config.valentineName}, my love...`;

  // IMPORTANT: These IDs must match your HTML exactly.
  // If your HTML uses different ids, rename them there or here.
  const q1 = document.getElementById("Do I still give you butterflies?");
  if (q1) q1.textContent = config.questions.first.text;

  const yesBtn1 = document.getElementById("yesBtn1");
  if (yesBtn1) yesBtn1.textContent = config.questions.first.yesBtn;

  const noBtn1 = document.getElementById("noBtn1");
  if (noBtn1) noBtn1.textContent = config.questions.first.noBtn;

  const secretAnswerBtn = document.getElementById("secretAnswerBtn");
  if (secretAnswerBtn) secretAnswerBtn.textContent = config.questions.first.secretAnswer;

  const q2 = document.getElementById('What does “forever” look like to you right now?');
  if (q2) q2.textContent = config.questions.second.text;

  const startText = document.getElementById("startText");
  if (startText) startText.textContent = config.questions.second.startText;

  const nextBtn = document.getElementById("nextBtn");
  if (nextBtn) nextBtn.textContent = config.questions.second.nextBtn;

  const q3 = document.getElementById("Will you be my valentine?");
  if (q3) q3.textContent = config.questions.third.text;

  const yesBtn3 = document.getElementById("yesBtn3");
  if (yesBtn3) yesBtn3.textContent = config.questions.third.yesBtn;

  const noBtn3 = document.getElementById("noBtn3");
  if (noBtn3) noBtn3.textContent = config.questions.third.noBtn;

  // Create initial floating elements
  createFloatingElements();

  // Setup music player
  setupMusicPlayer();

  // Setup Share Button
  setupShareButton();
});

// Create floating hearts and bears
function createFloatingElements() {
  const container = document.querySelector(".floating-elements");
  if (!container) return;

  // Create hearts
  (config.floatingEmojis.hearts || []).forEach((heart) => {
    const div = document.createElement("div");
    div.className = "heart";
    div.innerHTML = heart;
    setRandomPosition(div);
    container.appendChild(div);
  });

  // Create bears
  (config.floatingEmojis.bears || []).forEach((bear) => {
    const div = document.createElement("div");
    div.className = "bear";
    div.innerHTML = bear;
    setRandomPosition(div);
    container.appendChild(div);
  });
}

// Set random position for floating elements
function setRandomPosition(element) {
  element.style.left = Math.random() * 100 + "vw";
  element.style.animationDelay = Math.random() * 5 + "s";
  element.style.animationDuration = 10 + Math.random() * 20 + "s";
}

// Function to show next question
function showNextQuestion(questionNumber) {
  window.appState?.setState?.({ currentStep: questionNumber });
}

// Function to move the "No" button when clicked
function moveButton(button) {
  const x = Math.random() * (window.innerWidth - button.offsetWidth);
  const y = Math.random() * (window.innerHeight - button.offsetHeight);
  button.style.position = "fixed";
  button.style.left = x + "px";
  button.style.top = y + "px";
}

// Love meter functionality
const loveMeter = document.getElementById("loveMeter");
const loveValue = document.getElementById("loveValue");
const extraLove = document.getElementById("extraLove");

function setInitialPosition() {
  if (!loveMeter || !loveValue) return;
  loveMeter.value = 100;
  loveValue.textContent = 100;
  loveMeter.style.width = "100%";
}

if (loveMeter && loveValue) {
  loveMeter.addEventListener("input", () => {
    const value = parseInt(loveMeter.value, 10);
    loveValue.textContent = value;
    window.appState?.setState?.({ loveValue: value });

    if (!extraLove) return;

    if (value > 100) {
      extraLove.classList.remove("hidden");
      const overflowPercentage = (value - 100) / 9900;
      const extraWidth = overflowPercentage * window.innerWidth * 0.8;
      loveMeter.style.width = `calc(100% + ${extraWidth}px)`;
      loveMeter.style.transition = "width 0.3s";

      // Show different messages based on the value
      if (value >= 5000) {
        extraLove.classList.add("super-love");
        extraLove.textContent = config.loveMessages.extreme;
      } else if (value > 1000) {
        extraLove.classList.remove("super-love");
        extraLove.textContent = config.loveMessages.high;
      } else {
        extraLove.classList.remove("super-love");
        extraLove.textContent = config.loveMessages.normal;
      }
    } else {
      extraLove.classList.add("hidden");
      extraLove.classList.remove("super-love");
      loveMeter.style.width = "100%";
    }
  });
}

// Initialize love meter
window.addEventListener("DOMContentLoaded", setInitialPosition);
window.addEventListener("load", setInitialPosition);

// Celebration function
function celebrate() {
  window.appState?.setState?.({ currentStep: "celebration" });

  // Set celebration messages
  const ct = document.getElementById("celebrationTitle");
  const cm = document.getElementById("celebrationMessage");
  const ce = document.getElementById("celebrationEmojis");

  if (ct) ct.textContent = config.celebration.title;
  if (cm) cm.textContent = config.celebration.message;
  if (ce) ce.textContent = config.celebration.emojis;

  // Create heart explosion effect
  createHeartExplosion();
}

// Create heart explosion animation
function createHeartExplosion() {
  const container = document.querySelector(".floating-elements");
  if (!container) return;

  for (let i = 0; i < 50; i++) {
    const heart = document.createElement("div");
    const hearts = config.floatingEmojis.hearts || ["❤️"];
    const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
    heart.innerHTML = randomHeart;
    heart.className = "heart";
    container.appendChild(heart);
    setRandomPosition(heart);
  }
}

// Music Player Setup
function setupMusicPlayer() {
  const musicControls = document.getElementById("musicControls");
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");
  const musicSource = document.getElementById("musicSource");

  // If your HTML doesn't include these, safely do nothing.
  if (!musicControls || !musicToggle || !bgMusic || !musicSource) return;

  // Only show controls if music is enabled in config
  if (!config.music.enabled) {
    musicControls.style.display = "none";
    return;
  }

  // Set music source and volume
  musicSource.src = config.music.musicUrl;
  bgMusic.volume = config.music.volume || 0.5;
  bgMusic.load();

  // Try autoplay if enabled
  if (config.music.autoplay) {
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => window.appState?.setState?.({ isMusicPlaying: true }))
        .catch(() => console.log("Autoplay prevented by browser"));
    }
  }

  // Toggle music on button click
  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      window.appState?.setState?.({ isMusicPlaying: true });
    } else {
      bgMusic.pause();
      window.appState?.setState?.({ isMusicPlaying: false });
    }
  });
}

// Share Link Setup
function setupShareButton() {
  const shareBtn = document.getElementById("shareBtn");
  if (!shareBtn) return;

  shareBtn.addEventListener("click", () => {
    // Support either window.ValentineConfig or window.VALENTINE_CONFIG helper
    const copier =
      window.ValentineConfig?.copyShareLink || window.VALENTINE_CONFIG?.copyShareLink;

    if (typeof copier !== "function") return;

    copier().then((success) => {
      if (success) {
        const originalText = shareBtn.textContent;
        shareBtn.textContent = "Link Copied! ❤️";
        setTimeout(() => {
          shareBtn.textContent = originalText;
        }, 2000);
      }
    });
  });
}

