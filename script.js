// ✅ HARD-FORCED SETTINGS (no other config files needed)
const CONFIG = {
  pageTitle: "Will You Be My Valentine? 💝",
  valentineName: "Tiklu",

  floatingEmojis: {
    hearts: ["❤️", "💖", "💝", "💗", "💓"],
    bears: ["🧸", "🐻"],
  },

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

  loveMessages: {
    normal: "And beyond! 🥰",
    high: "To infinity and beyond! 🚀💝",
    extreme: "WOOOOW You love me that much?? 🥰🚀💝",
  },

  celebration: {
    title: "YAYYY!! 💘",
    message: "You just made my whole heart happy ❤️",
    emojis: "💖💘💕❤️🧸✨",
  },

  music: {
    enabled: true,
    autoplay: false, // autoplay often blocked—button works
    musicUrl: "dooron_dooron.mp3", // put in same folder as index.html
    startText: "🎵 Play Music",
    stopText: "🔇 Stop Music",
    volume: 0.5,
  },
};

document.title = CONFIG.pageTitle;

window.addEventListener("DOMContentLoaded", () => {
  // Fill all text
  const titleEl = document.getElementById("valentineTitle");
  if (titleEl) titleEl.textContent = `${CONFIG.valentineName}, my love...`;

  setText("question1Text", CONFIG.questions.first.text);
  setText("yesBtn1", CONFIG.questions.first.yesBtn);
  setText("noBtn1", CONFIG.questions.first.noBtn);
  setText("secretAnswerBtn", CONFIG.questions.first.secretAnswer);

  setText("question2Text", CONFIG.questions.second.text);
  setText("startText", CONFIG.questions.second.startText);
  setText("nextBtn", CONFIG.questions.second.nextBtn);

  setText("question3Text", CONFIG.questions.third.text);
  setText("yesBtn3", CONFIG.questions.third.yesBtn);
  setText("noBtn3", CONFIG.questions.third.noBtn);

  // Buttons behavior
  const yesBtn1 = document.getElementById("yesBtn1");
  const noBtn1 = document.getElementById("noBtn1");
  const secretBtn = document.getElementById("secretAnswerBtn");
  const nextBtn = document.getElementById("nextBtn");
  const yesBtn3 = document.getElementById("yesBtn3");
  const noBtn3 = document.getElementById("noBtn3");

  if (yesBtn1) yesBtn1.onclick = () => showStep(2);
  if (noBtn1) noBtn1.onclick = () => moveButton(noBtn1);
  if (secretBtn) secretBtn.onclick = () => showStep(2);
  if (nextBtn) nextBtn.onclick = () => showStep(3);
  if (yesBtn3) yesBtn3.onclick = () => celebrate();
  if (noBtn3) noBtn3.onclick = () => moveButton(noBtn3);

  // Floating emojis
  createFloatingElements();

  // Love meter
  initLoveMeter();

  // Music
  setupMusicPlayer();

  // Share
  setupShareButton();
});

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function showStep(step) {
  document.getElementById("question1")?.classList.toggle("hidden", step !== 1);
  document.getElementById("question2")?.classList.toggle("hidden", step !== 2);
  document.getElementById("question3")?.classList.toggle("hidden", step !== 3);
}

function moveButton(button) {
  const x = Math.random() * (window.innerWidth - button.offsetWidth);
  const y = Math.random() * (window.innerHeight - button.offsetHeight);
  button.style.position = "fixed";
  button.style.left = x + "px";
  button.style.top = y + "px";
}

function createFloatingElements() {
  const container = document.querySelector(".floating-elements");
  if (!container) return;

  CONFIG.floatingEmojis.hearts.forEach((h) => addFloat(container, "heart", h));
  CONFIG.floatingEmojis.bears.forEach((b) => addFloat(container, "bear", b));
}

function addFloat(container, className, emoji) {
  const div = document.createElement("div");
  div.className = className;
  div.innerHTML = emoji;
  div.style.left = Math.random() * 100 + "vw";
  div.style.animationDelay = Math.random() * 5 + "s";
  div.style.animationDuration = 10 + Math.random() * 20 + "s";
  container.appendChild(div);
}

function initLoveMeter() {
  const loveMeter = document.getElementById("loveMeter");
  const loveValue = document.getElementById("loveValue");
  const extraLove = document.getElementById("extraLove");
  if (!loveMeter || !loveValue || !extraLove) return;

  loveMeter.value = 100;
  loveValue.textContent = "100";

  loveMeter.addEventListener("input", () => {
    const value = parseInt(loveMeter.value, 10);
    loveValue.textContent = String(value);

    if (value > 100) {
      extraLove.classList.remove("hidden");

      if (value >= 5000) extraLove.textContent = CONFIG.loveMessages.extreme;
      else if (value > 1000) extraLove.textContent = CONFIG.loveMessages.high;
      else extraLove.textContent = CONFIG.loveMessages.normal;
    } else {
      extraLove.classList.add("hidden");
      extraLove.textContent = "";
    }
  });
}

function celebrate() {
  // hide questions
  document.getElementById("question1")?.classList.add("hidden");
  document.getElementById("question2")?.classList.add("hidden");
  document.getElementById("question3")?.classList.add("hidden");

  // show celebration
  document.getElementById("celebration")?.classList.remove("hidden");
  setText("celebrationTitle", CONFIG.celebration.title);
  setText("celebrationMessage", CONFIG.celebration.message);
  setText("celebrationEmojis", CONFIG.celebration.emojis);

  // heart burst
  const container = document.querySelector(".floating-elements");
  if (!container) return;
  for (let i = 0; i < 40; i++) {
    addFloat(container, "heart", "💖");
  }
}

function setupMusicPlayer() {
  const controls = document.getElementById("musicControls");
  const toggle = document.getElementById("musicToggle");
  const audio = document.getElementById("bgMusic");
  const source = document.getElementById("musicSource");

  if (!controls || !toggle || !audio || !source) return;

  if (!CONFIG.music.enabled) {
    controls.style.display = "none";
    return;
  }

  source.src = CONFIG.music.musicUrl;
  audio.volume = CONFIG.music.volume;
  audio.load();

  toggle.textContent = CONFIG.music.startText;

  if (CONFIG.music.autoplay) {
    audio.play().catch(() => {});
  }

  toggle.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      toggle.textContent = CONFIG.music.stopText;
    } else {
      audio.pause();
      toggle.textContent = CONFIG.music.startText;
    }
  });
}

function setupShareButton() {
  const shareBtn = document.getElementById("shareBtn");
  if (!shareBtn) return;

  shareBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      const original = shareBtn.textContent;
      shareBtn.textContent = "Link Copied! ❤️";
      setTimeout(() => (shareBtn.textContent = original), 1500);
    } catch {}
  });
}

