const randHP = (max, min) => Math.floor(Math.random() * (max - min)) + 5;

Vue.createApp({
  data() {
    return {
      playerH: 80,
      enemyH: 80,
      currentRound: 0,
      inGame: true,
      gameLog: [],
    };
  },

  watch: {
    enemyH(val) {
      if (val <= 5) this.inGame = false;
    },
    playerH(val) {
      if (val <= 5) this.inGame = false;
    },
  },

  computed: {
    // Better than setting inline style in HTML
    // it's recommended using computed and set the methods as property
    enemyBarStyles() {
      if (this.enemyH <= 5) return { width: 0 + "%" };
      return { width: this.enemyH + "%" };
    },
    playerBarStyles() {
      if (this.playerH <= 5) return { width: 0 + "%" };
      return { width: this.playerH + "%" };
    },
    launchSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
    winnerIs() {
      if (this.playerH === this.enemyH) return "Draft";
      return this.playerH > this.enemyH ? "Charmander" : "Haunter";
    },
  },

  methods: {
    attackEnemy() {
      const attackValue = randHP(12, 5);
      this.enemyH -= attackValue;
      this.attackPlayer();
      this.pushToLog("Charmander", "attack", attackValue);
      this.currentRound++;
    },
    attackPlayer() {
      const attackValue = randHP(15, 8);
      this.playerH -= attackValue;
      this.pushToLog("Haunter", "attack", attackValue);
    },
    specialAttack() {
      const attackValue = randHP(22, 5);
      this.enemyH -= attackValue;
      this.attackPlayer();
      this.pushToLog("Charmander", "special-attack", attackValue);
      this.currentRound++;
    },
    selfHealing() {
      const healValue = randHP(10, 5);
      this.playerH += healValue;
      this.currentRound++;
      this.pushToLog("Charmander", "self-heal", healValue);
      this.attackPlayer();
      if (this.playerH >= 100) this.playerH = 100;
    },
    pushToLog(who, what, val) {
      this.gameLog.unshift({
        pg: who,
        move: what,
        amount: val,
        id: Math.random() * 1000 + val,
      });
    },
    resetTheGame() {
      this.inGame = true;
      this.playerH = 100;
      this.enemyH = 100;
      this.currentRound = 0;
      this.gameLog = [];
    },
  },
}).mount("#app");
