// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
  // Your Valentine's name that will appear in the title
  valentineName: "Tiklu",

  // The title that appears in the browser tab
  pageTitle: "Will You Be My Valentine? 💝",

  // Floating emojis that appear in the background
  floatingEmojis: {
    hearts: ["❤️", "💖", "💝", "💗", "💓"],
    bears: ["🧸", "🐻"],
  },

  // Questions and answers
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

  // Love meter messages
  loveMessages: {
    extreme: "WOOOOW You love me that much?? 🥰🚀💝",
    high: "To infinity and beyond! 🚀💝",
    normal: "And beyond! 🥰",
  },

  // Messages that appear after they say "Yes!"
  celebration: {
    title: "Yay! I'm the luckiest person in the world! 🎉💝💖💝💓",
    message: "Now come get your gift, a big warm hug and a huge kiss!",
    emojis: "🎁💖🤗💝💋❤️💕",
  },

  // Color scheme for the website
  colors: {
    backgroundStart: "#ffafbd",
    backgroundEnd: "#ffc3a0",
    buttonBackground: "#ff6b6b",
    buttonHover: "#ff8787",
    textColor: "#ff4757",
  },

  // Animation settings
  animations: {
    floatDuration: "15s",
    floatDistance: "50px",
    bounceSpeed: "0.5s",
    heartExplosionSize: 1.5,
  },

  // Background Music (Optional)
  // IMPORTANT: this must be a direct .mp3 URL you host (or a local file path).
  // If you put the mp3 in the same folder as index.html, use: "dooron-dooron.mp3"
  music: {
    enabled: true,
    autoplay: false, // recommended (autoplay often blocked). User can click play.
    musicUrl: "dooron-dooron.mp3", // Dooron Dooron
    startText: "🎵 Play Music",
    stopText: "🔇 Stop Music",
    volume: 0.5,
  },
};

// Export for use in other scripts
window.DEFAULT_CONFIG = CONFIG;
window.VALENTINE_CONFIG = { ...CONFIG };
