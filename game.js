export class Game {
  constructor() {
    this.version = "0.0.3";

    //this.gameFrame = 0;
    this.frameCount = 0;
    this.frameSaveCount = 0;

    this.hover = false;

    this.pointScore = 0;
    this.limitScoreTotal = 0;
    this.extendScoreTotal = 0;

    this.limits = {
      Score: 0,
      scoreThis: 0,
      Gain: 1,
    };

    this.totalStructures = [0,0,0,0,0,0];
    this.structures = [0, 0, 0, 0, 0, 0];

    this.upgradesSL1 = [0, 0, 0, 0, 0]; //Structures in Limits
    this.upgradesQL1 = [0, 0, 0, 0, 0]; //Meta Upgrades in Limits (Q,Q,L,L,L)

    this.options = {
      tabIndex: [0, 0, 0, 0],
      monospace: false,
      sidestats: false,
    };
  }

  saveGame() {
    this.frameSaveCount = 0;
    let gameData = JSON.stringify(this);
    localStorage.setItem("gameData", gameData);
    console.log("saved");
  }

  loadGame() {
    let gameData = localStorage.getItem("gameData");
    let savedGame = JSON.parse(gameData);

    if (savedGame != null) {
      if (savedGame.version !== this.version) {
        for (const key in savedGame) {
          if (savedGame.hasOwnProperty(key) && !this.hasOwnProperty(key)) {
            this[key] = savedGame[key];
          }
        }
      }

      //upgrading past save files
      if (savedGame.options.tabIndex.length !== 4) {
        //tabIndex fix
        savedGame.options.tabIndex = this.options.tabIndex;
      }
      if (savedGame.options.sidestats == null) {
        savedGame.options.sidestats = this.options.sidestats;
      }
      if (savedGame.limits.scoreThis == null) {
        //fix "Limits this Extend"
        savedGame.limits.scoreThis = savedGame.limitScoreTotal;
      }
      if(savedGame.totalStructures == null){
        savedGame.totalStructures = savedGame.structures;
      }
    }
    Object.assign(this, savedGame);
    //this.convertDecimal();
    console.log(this);
    console.log("loaded");
  }

  exportGame() {
    let gameData = JSON.stringify(this);
    localStorage.setItem("gameData", gameData);
    prompt("Exported Game Data:", gameData);
  }

  importGame() {
    let gameData = prompt("Input your save data.");
    let savedGame = JSON.parse(gameData);
    Object.assign(this, savedGame);
    console.log(this);
    localStorage.setItem("gameData", gameData);

    console.log("imported");
  }
}
