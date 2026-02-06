const CONFIG = window.VALENTINE_CONFIG || {};
document.title = CONFIG.pageTitle || "Will You Be My Valentine? 💝";

window.addEventListener("DOMContentLoaded", () => {
  // Title
  const titleEl = document.getElementById("valentineTitle");
  if (titleEl) titleEl.textContent = `${CONFIG.valentineName || "Tiklu"}, my love...`;

  // Question 1
  setText("question1Text", CONFIG.questions?.first?.text);
  setText("yesBtn1", CONFIG.questions?.first?.yesBtn);
  setText("noBtn1", CONFIG.questions?.first?.noBtn);
  setText("secretAnswerBtn", CONFIG.questions?.first?.secretAnswer);

  // Question 2 (Love meter)
  setText("question2Text", CONFIG.questions?.second?.text);
  setText("startText", CONFIG.questions?.second?.startText);
  setText("nextBtn", CONFIG.questions?.second?.nextBtn);

  // Question 3 (Text box)
  setText("question3Text", CONFIG.questions?.third?.text);
  setText("submitForeverBtn", CONFIG.questions?.third?.buttonText);

  const foreverAnswer = document.getElementById("foreverAnswer");
  if (foreverAnswer) {
    foreverAnswer.placeholder = CONFIG.questions?.third?.placeholder || "Type your answer here...";
  }

  // Question 4 (Final YES/NO)
  setText("question4Text", CONFIG.questions?.fourth?.text);
  setText("yesBtn4", CONFIG.questions?.fourth?.yesBtn);
  setText("noBtn4", CONFIG.questions?.fourth?.noBtn);

  // Button wiring
  const yesBtn1 = document.getElementById("yesBtn1");
  const noBtn1 = document.getElementById("noBtn1");
  const secretBtn = document.getElementById("secretAnswerBtn");
  const nextBtn = document.getElementById("nextBtn");

  const submitForeverBtn = document.getElementById("submitForeverBtn");
  const yesBtn4 = document.getElementById("yesBtn4");
  const noBtn4 = document.getElementById("noBtn4");

  if (yesBtn1) yesBtn1.onclick = () => showStep(2);
  if (noBtn1) noBtn1.onclick = () => moveButton(noBtn1);
  if (secretBtn) secretBtn.onclick = () => showStep(2);

  if (nextBtn) nextBtn.onclick = () => showStep(3);

  // Step 3 -> Step 4 (we store it but we DO NOT display it later)
  if (submitForeverBtn) {
    submitForeverBtn.onclick = () => {
      window.foreverAnswer = document.getElementById("foreverAnswer")?.value?.trim() || "";
      showStep(4);
    };
  }

  if (yesBtn4) yesBtn4.onclick = () => celebrate();
  if (noBtn4) noBtn4.onclick = () => moveButton(noBtn4);

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
  if (el && typeof text === "string") el.textContent = text;
}

function showStep(step) {
  document.getElementById("question1")?.classList.toggle("hidden", step !== 1);
  document.getElementById("question2")?.classList.toggle("hidden", step !== 2);
  document.getElementById("question3")?.classList.toggle("hidden", step !== 3);
  document.getElementById("question4")?.classList.toggle("hidden", step !== 4);
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

  const hearts = CONFIG.floatingEmojis?.hearts || ["❤️"];
  const bears = CONFIG.floatingEmojis?.bears || ["🧸"];

  hearts.forEach((h) => addFloat(container, "heart", h));
  bears.forEach((b) => addFloat(container, "bear", b));
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

      if (value >= 5000) extraLove.textContent = CONFIG.loveMessages?.extreme || "";
      else if (value > 1000) extraLove.textContent = CONFIG.loveMessages?.high || "";
      else extraLove.textContent = CONFIG.loveMessages?.normal || "";
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
  document.getElementById("question4")?.classList.add("hidden");

  // show celebration
  document.getElementById("celebration")?.classList.remove("hidden");
  setText("celebrationTitle", CONFIG.celebration?.title || "YAYYY!! 💘");
  setText("celebrationMessage", CONFIG.celebration?.message || "You just made my whole heart happy ❤️");
  setText("celebrationEmojis", CONFIG.celebration?.emojis || "💖💘💕❤️🧸✨");

  // heart burst
  const container = document.querySelector(".floating-elements");
  if (!container) return;
  for (let i = 0; i < 40; i++) addFloat(container, "heart", "💖");
}

function setupMusicPlayer() {
  const controls = document.getElementById("musicControls");
  const toggle = document.getElementById("musicToggle");
  const audio = document.getElementById("bgMusic");
  const source = document.getElementById("musicSource");

  if (!controls || !toggle || !audio || !source) return;

  if (!CONFIG.music?.enabled) {
    controls.style.display = "none";
    return;
  }

  source.src = CONFIG.music.musicUrl;
  audio.volume = CONFIG.music.volume ?? 0.5;
  audio.load();

  toggle.textContent = CONFIG.music.startText || "🎵 Play Music";

  if (CONFIG.music.autoplay) {
    audio.play().catch(() => {});
  }

  toggle.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      toggle.textContent = CONFIG.music.stopText || "🔇 Stop Music";
    } else {
      audio.pause();
      toggle.textContent = CONFIG.music.startText || "🎵 Play Music";
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
