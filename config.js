window.VALENTINE_CONFIG = {
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
      text: "How much do you love me?",
      startText: "Start 💌",
      nextBtn: "Next ➜",
    },

    // ✅ This is the ONLY question with a text box
    third: {
      text: "What does “forever” look like to you right now?",
      placeholder: "Type your answer here...",
      buttonText: "Next ➜",
    },

    // ✅ Final question stays YES/NO (no text box)
    fourth: {
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
    autoplay: false,
    musicUrl: "dooron-dooron.mp3",
    startText: "🎵 Play Music",
    stopText: "🔇 Stop Music",
    volume: 0.5,
  },
};
