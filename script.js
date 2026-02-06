// Always read the latest config object
function getConfig() {
  return window.VALENTINE_CONFIG || {};
}

// Force what YOU want (Tiklu + 3 questions) no matter what other scripts do
function forceUserConfig(config) {
  config.valentineName = "Tiklu";
  config.pageTitle = config.pageTitle || "Will You Be My Valentine? 💝";

  config.questions = config.questions || {};
  config.questions.first = config.questions.first || {};
  config.questions.second = config.questions.second || {};
  config.questions.third = config.questions.third || {};

  config.questions.first.text = "Do I still give you butterflies?";
  config.questions.second.text = "What does “forever” look like to you right now?";
  config.questions.third.text = "Will you be my valentine?";

  config.questions.first.yesBtn = config.questions.first.yesBtn || "Yes ❤️";
  config.questions.first.noBtn = config.questions.first.noBtn || "No 🙈";
  config.questions.first.secretAnswer = config.questions.first.secretAnswer || "Secret Answer 😏";

  config.questions.second.startText = config.questions.second.startText || "Start 💌";
  config.questions.second.nextBtn = config.questions.second.nextBtn || "Next ➜";

  config.questions.third.yesBtn = config.questions.third.yesBtn || "Yes!! 💘";
  config.questions.third.noBtn = config.questions.third.noBtn || "No 😭";

  config.floatingEmojis = config.floatingEmojis || { hearts: ["❤️"], bears: ["🧸"] };
  config.loveMessages = config.loveMessages || {
    normal: "And beyond! 🥰",
    high: "To infinity and beyond! 🚀💝",
    extreme: "WOOOOW You love me that much?? 🥰🚀💝",
  };
  config.celebration = config.celebration || {
    title: "Yay! 💘",
    message: "You made me so happy ❤️",
    emojis: "💖💘💕❤️🧸✨",
  };

  config.music = config.music || {};
  config.music.enabled = typeof config.music.enabled === "boolean" ? config.music.enabled : true;
  config.music.autoplay = typeof config.music.autoplay === "boolean" ? config.music.autoplay : false;
  config.music.musicUrl = config.music.musicUrl || "dooron-dooron.mp3";
  config.music.volume = typeof config.music.volume === "number" ? config.music.volume : 0.5;

  return config;
}

window.addEventListener("DOMContentLoaded", () => {
  let config = forceUserConfig(getConfig());

  // Title
  document.title = config.pageTitle;
  const titleEl = document.getElementById("valentineTitle");
  if (titleEl) titleEl.textContent = `${config.valentineName}, my love...`;

  // ✅ Correct IDs (match your HTML)
  const q1 = document.getElementById("question1Text");
  const q2 = document.getElementById("question2Text");
  const q3 = document.getElementById("question3Text");

  if (q1) q1.textContent = config.questions.first.text;
  if (q2) q2.textContent = config.questions.second.text;
  if (q3) q3.textContent = config.questions.third.text;

  const yesBtn1 = document.getElementById("yesBtn1");
  const noBtn1 = document.getElementById("noBtn1");
  const secretAnswerBtn = document.getElementById("secretAnswerBtn");
  const startText = document.getElementById("startText");
  const nextBtn = document.getElementById("nextBtn");
  const yesBtn3 = document.getElementById("yesBtn3");
  const noBtn3 = document.getElementById("noBtn3");

  if (yesBtn1) yesBtn1.textContent = config.questions.first.yesBtn;
  if (noBtn1) noBtn1.textContent = config.questions.first.noBtn;
  if (secretAnswerBtn) secretAnswerBtn.textContent = config.questions.first.secretAnswer;

  if (startText) startText.textContent = config.questions.second.startText;
  if (nextBtn) nextBtn.textContent = config.questions.second.nextBtn;

  if (yesBtn3) yesBtn3.textContent = config.questions.third.yesBtn;
  if (noBtn3) noBtn3.textContent = config.questions.third.noBtn;

  // Ensure buttons behave correctly even if HTML onclick is wrong
  if (yesBtn1) yesBtn1.onclick = () => showNextQuestion(2);
  if (noBtn1) noBtn1.onclick = function () { moveButton(this); };
  if (secretAnswerBtn) secretAnswerBtn.onclick = () => showNextQuestion(2);
  if (nextBtn) nextBtn.onclick = () => showNextQuestion(3);
  if (yesBtn3) yesBtn3.onclick = () => celebrate();
  if (noBtn3) noBtn3.onclick = function () { moveButton(this); };

  createFloatingElements(config);
  setupMusicPlayer(config);
  setupShareButton();

  // Love meter init
  setInitialPosition();
});

// Create floating hearts and bears
function createFloatingElements(config) {
  const container = document.querySelector(".floating-elements");
  if (!container) return;

  (config.floatingEmojis.hearts || []).forEach((heart) => {
    const div = document.createElement("div");
    div.className = "heart";
    div.innerHTML = heart;
    setRandomPosition(div);
    container.appendChild(div);
  });

  (config.floatingEmojis.bears || []).forEach((bear) => {
    const div = document.createElement("div");
    div.className = "bear";
    div.innerHTML = bear;
    setRandomPosition(div);
    container.appendChild(div);
  });
}

function setRandomPosition(element) {
  element.style.left = Math.random() * 100 + "vw";
  element.style.animationDelay = Math.random() * 5 + "s";
  element.style.animationDuration = 10 + Math.random() * 20 + "s";
}

// Show next question (works even without appState)
function showNextQuestion(step) {
  document.getElementById("question1")?.classList.toggle("hidden", step !== 1);
  document.getElementById("question2")?.classList.toggle("hidden", step !== 2);
  document.getElementById("question3")?.classList.toggle("hidden", step !== 3);

  window.appState?.setState?.({ currentStep: step });
}

// Move button
function moveButton(button) {
  const x = Math.random() * (window.innerWidth - button.offsetWidth);
  const y = Math.random() * (window.innerHeight - button.offsetHeight);
  button.style.position = "fixed";
  button.style.left = x + "px";
  button.style.top = y + "px";
}

// Love meter
const loveMeter = document.getElementById("loveMeter");
const loveValue = document.getElementById("loveValue");
const extraLove = document.getElementById("extraLove");

function setInitialPosition() {
  const lm = document.getElementById("loveMeter");
  const lv = document.getElementById("loveValue");
  if (!lm || !lv) return;
  lm.value = 100;
  lv.textContent = 100;
  lm.style.width = "100%";
}

document.addEventListener("input", (e) => {
  if (e.target?.id !== "loveMeter") return;

  const config = forceUserConfig(getConfig());
  const lm = document.getElementById("loveMeter");
  const lv = document.getElementById("loveValue");
  const el = document.getElementById("extraLove");
  if (!lm || !lv || !el) return;

  const value = parseInt(lm.value, 10);
  lv.textContent = value;

  if (value > 100) {
    el.classList.remove("hidden");
    const overflowPercentage = (value - 100) / 9900;
    const extraWidth = overflowPercentage * window.innerWidth * 0.8;
    lm.style.width = `calc(100% + ${extraWidth}px)`;
    lm.style.transition = "width 0.3s";

    if (value >= 5000) el.textContent = config.loveMessages.extreme;
    else if (value > 1000) el.textContent = config.loveMessages.high;
    else el.textContent = config.loveMessages.normal;
  } else {
    el.classList.add("hidden");
    lm.style.width = "100%";
  }
});

// Celebration
function celebrate() {
  const config = forceUserConfig(getConfig());
  window.appState?.setState?.({ currentStep: "celebration" });

  document.getElementById("question1")?.classList.add("hidden");
  document.getElementById("question2")?.classList.add("hidden");
  document.getElementById("question3")?.classList.add("hidden");
  document.getElementById("celebration")?.classList.remove("hidden");

  document.getElementById("celebrationTitle").textContent = config.celebration.title;
  document.getElementById("celebrationMessage").textContent = config.celebration.message;
  document.getElementById("celebrationEmojis").textContent = config.celebration.emojis;

  createHeartExplosion(config);
}

function createHeartExplosion(config) {
  const container = document.querySelector(".floating-elements");
  if (!container) return;

  const hearts = config.floatingEmojis.hearts || ["❤️"];
  for (let i = 0; i < 50; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    container.appendChild(heart);
    setRandomPosition(heart);
  }
}

// Music
function setupMusicPlayer(config) {
  const musicControls = document.getElementById("musicControls");
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");
  const musicSource = document.getElementById("musicSource");

  if (!musicControls || !musicToggle || !bgMusic || !musicSource) return;

  if (!config.music.enabled) {
    musicControls.style.display = "none";
    return;
  }

  musicSource.src = config.music.musicUrl;
  bgMusic.volume = config.music.volume || 0.5;
  bgMusic.load();

  // update button text
  const playText = config.music.startText || "🎵 Play Music";
  const stopText = config.music.stopText || "🔇 Stop Music";
  musicToggle.textContent = playText;

  if (config.music.autoplay) {
    bgMusic.play().catch(() => {
      // autoplay often blocked — user click will work
    });
  }

  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.textContent = stopText;
    } else {
      bgMusic.pause();
      musicToggle.textContent = playText;
    }
  });
}

// Share button (simple copy link)
function setupShareButton() {
  const shareBtn = document.getElementById("shareBtn");
  if (!shareBtn) return;

  shareBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      const t = shareBtn.textContent;
      shareBtn.textContent = "Link Copied! ❤️";
      setTimeout(() => (shareBtn.textContent = t), 1500);
    } catch {
      // ignore
    }
  });
}


