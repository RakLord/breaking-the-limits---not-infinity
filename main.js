import { Game } from "./game.js";
import { Texts } from "./texts.js";
import * as Constructs from "./constructures.js";
import "./mousetrap.js";

let Displays = {};
let Buttons = {};

let hover = false;

$(document).ready(function () {
  console.log("Debug message");
  init();
  setInterval(tick, 10);

  //setInterval(tick,50);
});

function init() {
  window.game = new Game();
  window.texts = new Texts();

  //Displays
  Displays.Body = $("#body");

  Displays.Statistics = $("#statistics");

  //Scores
  Displays.DisplayScorePoint = $("#pointScore");
  Displays.DisplayScoreLimit = $("#limitScore");
  Displays.DisplayProductionPoint = $("#productionPoint");

  //Progress Bars
  Displays.BarLimit = $("#barLimit");
  Displays.BarExtend = $("#barExtend");

  Displays.BarLimitProgress = $("#barLimitProgress");
  Displays.BarExtendProgress = $("#barExtendProgress");

  //Structures
  Displays.StructureContainer = $("#structures");

  Displays.StructureCosts = [
    $("#genL1cost"),
    $("#genL2cost"),
    $("#genL3cost"),
    $("#genL4cost"),
    $("#genL5cost"),
  ];

  Displays.StructureGeneration = [
    $("#genL1gen"),
    $("#genL2gen"),
    $("#genL3gen"),
    $("#genL4gen"),
    $("#genL5gen"),
  ];

  Displays.StructureOwn = [
    $("#genL1own"),
    $("#genL2own"),
    $("#genL3own"),
    $("#genL4own"),
    $("#genL5own"),
  ];

  //Upgrades
  Displays.LimitUpgradesContainer = $("#upgradesL");
  Displays.LimitUpgradesTitle = $("#upgradeTitle");
  Displays.LimitUpgradesDescription = $("#upgradeDescription");
  Displays.LimitUpgradesCost = $("#upgradeCost");
  Displays.LimitUpgradesLevel = $("#upgradeLevel");
  Displays.LimitUpgradesEffect = $("#upgradeEffect");

  //Buttons

  //Gains
  Buttons.GainLimit = $("#btnLimitGain");

  //Structures
  Buttons.Structures = [
    $("#genL1"),
    $("#genL2"),
    $("#genL3"),
    $("#genL4"),
    $("#genL5"),
  ];

  //Upgrades
  Buttons.UpgradesStructures = [
    $("#upgS11"),
    $("#upgS21"),
    $("#upgS31"),
    $("#upgS41"),
    $("#upgS51"),
  ];
  Buttons.UpgradesLimits = [
    $("#upgMQ1"),
    $("#upgMQ2"),
    $("#upgLL1"),
    $("#upgLL2"),
    $("#upgLL3"),
  ];
  Buttons.UpgradesInfo = [$("upgIF")];

  //Saving
  Buttons.Save = $("#btnSave");
  Buttons.Load = $("#btnLoad");
  Buttons.Export = $("#btnExport");
  Buttons.Import = $("#btnImport");

  //Options
  Buttons.Monospace = $("#monospace");
  Buttons.SideStats = $("#sidestats");

  //Tabs
  Displays.TabLimit = $("#tabLimit");
  Displays.TabControlLimit = $("#tabControlLimit");
  Displays.TabStructures = $("#tabStructures");
  Displays.TabUpgrades = $("#tabUpgrades");

  Displays.TabExtend = $("#tabExtend");

  Displays.TabOptions = $("#tabOptions");
  Displays.TabVersion = $("#tabVersion");

  Buttons.Limit = $("#btnLimitTab");
  Buttons.btnStructures = $("#btnStructuresTab");
  Buttons.btnUpgrades = $("#btnUpgradesTab");

  Buttons.Extend = $("#btnExtendTab");

  Buttons.Options = $("#btnOptionsTab");
  Buttons.Version = $("#btnVersion");

  //Click Functions go here. :D

  Buttons.GainLimit.click(function () {
    simClick();
  });

  //Structure Buttons
  for (let i = 0; i < game.structures.length - 1; i++) {
    Buttons.Structures[i].click(function () {
      let Cost = Constructs.structuresCost(i);
      if (game.limits.Score >= Cost) {
        game.limits.Score -= Cost;
        game.structures[i] += 1;
      }
    });
  }

  //Upgrades :O

  for (let i = 0; i < game.upgradesSL1.length; i++) {
    Buttons.UpgradesStructures[i].hover(function () {
      let CostNEffect = Constructs.upgradesDisplay("SL1 CE", i);
      texts.upgradeDescStructures(
        i,
        Displays.LimitUpgradesTitle,
        Displays.LimitUpgradesDescription
      );

      if (game.upgradesSL1[i] < 5) {
        Displays.LimitUpgradesCost.text(CostNEffect[0] + " S" + (i + 1));
      } else {
        //if (that upgrade's level is 5)
        Displays.LimitUpgradesCost.text("Maximum");
      }

      Displays.LimitUpgradesLevel.text(game.upgradesSL1[i] + " / 5");
      Displays.LimitUpgradesEffect.text(CostNEffect[1]);
    });

    Buttons.UpgradesStructures[i].click(function () {
      let Cost = Constructs.upgradesDisplay("SL1 C", i);
      if (game.structures[i] >= Cost && game.upgradesSL1[i] < 5) {
        game.structures[i] -= Cost;
        game.upgradesSL1[i] += 1;
      }
    });
  }
  for (let i = 0; i < game.upgradesQL1.length; i++) {
    switch (i) {
      case 0:
        Buttons.UpgradesLimits[i].hover(function () {
          let CostNEffect = Constructs.upgradesDisplay("QL1 CE", i);
          texts.upgradeDescLimits(
            i,
            Displays.LimitUpgradesTitle,
            Displays.LimitUpgradesDescription
          );

          if (game.upgradesQL1[i] < 10) {
            Displays.LimitUpgradesCost.text(CostNEffect[0] + " Points");
          } else {
            //if (that upgrade's level is 10)
            Displays.LimitUpgradesCost.text("Maximum");
          }

          Displays.LimitUpgradesLevel.text(game.upgradesQL1[i] + " / 10");
          Displays.LimitUpgradesEffect.text(
            Math.floor(CostNEffect[1]) + " frames"
          );
        });

        Buttons.UpgradesLimits[i].click(function () {
          let Cost = Constructs.upgradesDisplay("QL1 C", i);
          if (game.pointScore >= Cost && game.upgradesQL1[i] < 10) {
            game.pointScore -= Cost;
            game.upgradesQL1[i] += 1;
          }
        });

        break;

      case 1:
        Buttons.UpgradesLimits[i].hover(function () {
          let CostNEffect = Constructs.upgradesDisplay("QL1 CE", i);
          texts.upgradeDescLimits(
            i,
            Displays.LimitUpgradesTitle,
            Displays.LimitUpgradesDescription
          );

          if (game.upgradesQL1[i] < 1) {
            Displays.LimitUpgradesCost.text(CostNEffect[0] + " Points");
          } else {
            //if (that upgrade's level is 1)
            Displays.LimitUpgradesCost.text("Maximum");
          }

          Displays.LimitUpgradesLevel.text(game.upgradesQL1[i] + " / 1");
          Displays.LimitUpgradesEffect.text(Math.floor(CostNEffect[1]));
        });

        Buttons.UpgradesLimits[i].click(function () {
          let Cost = Constructs.upgradesDisplay("QL1 C", i);
          if (game.pointScore >= Cost && game.upgradesQL1[i] < 1) {
            game.pointScore -= Cost;
            game.upgradesQL1[i] += 1;
          }
        });

        break;

      case 2:
      case 3:
      case 4:
        Buttons.UpgradesLimits[i].hover(function () {
          let CostNEffect = Constructs.upgradesDisplay("QL1 CE", i);
          texts.upgradeDescLimits(
            i,
            Displays.LimitUpgradesTitle,
            Displays.LimitUpgradesDescription
          );

          if (game.upgradesQL1[i] < 5) {
            Displays.LimitUpgradesCost.text(CostNEffect[0] + " Limits");
          } else {
            //if (that upgrade's level is 5)
            Displays.LimitUpgradesCost.text("Maximum");
          }

          Displays.LimitUpgradesLevel.text(game.upgradesQL1[i] + " / 5");
          Displays.LimitUpgradesEffect.text(Math.floor(CostNEffect[1]));
        });

        Buttons.UpgradesLimits[i].click(function () {
          let Cost = Constructs.upgradesDisplay("QL1 CE", i);
          if (game.limits.Score >= Cost[0] && game.upgradesQL1[i] < 5) {
            game.limits.Score -= Cost[0];
            game.upgradesQL1[i] += 1;
          }
          game.limits.Gain = Cost[1];
        });

        break;
    }
  }

  // Buttons.UpgradesStructures[0].hover(function(){
  //     Displays.LimitUpgradesDescription.text("Test Text");
  // })

  //Tab Buttons
  Buttons.Limit.click(function () {
    game.options.tabIndex[0] = 0;
  });
  Buttons.btnStructures.click(function () {
    game.options.tabIndex[1] = 0;
  });
  Buttons.btnUpgrades.click(function () {
    game.options.tabIndex[1] = 1;
  });

  Buttons.Extend.click(function () {
    game.options.tabIndex[0] = 1;
  });

  Buttons.Options.click(function () {
    game.options.tabIndex[0] = 8;
  });
  Buttons.Version.click(function () {
    game.options.tabIndex[0] = 9;
  });

  //Options Buttons and Misc.
  Buttons.Monospace.click(function () {
    game.options.monospace = !game.options.monospace;
    // if (game.options.monospace == true){
    //     game.options.monospace = false;
    // }
    // else{
    //     game.options.monospace = true;
    // }
  });
  Buttons.SideStats.click(function () {
    game.options.sidestats = !game.options.sidestats;
  });

  Displays.DisplayProductionPoint.hover(function () {
    hover = !hover;
  });

  //Saving
  Buttons.Save.click(function () {
    game.saveGame();
  });

  Buttons.Load.click(function () {
    game.loadGame();
  });

  Buttons.Export.click(function () {
    game.exportGame();
  });

  Buttons.Import.click(function () {
    game.importGame();
  });

  //end init
  game.loadGame();
  texts.versionGame(Displays.TabVersion);
  game.frameSaveCount = 0;
}

function simClick() {
  if (game.pointScore >= game.limits.Score) {
    game.limits.Score += game.limits.Gain;
    game.limitScoreTotal += game.limits.Gain;
    game.pointScore = 0;
  }
}
function holdClick() {
  if (game.frameCount % 10 == 0) {
    simClick();
  }
}

function updateGeneration(game) {
  let generation = (1 + Constructs.structuresGen(game.structures)) / 100;
  game.pointScore = game.pointScore + generation;
  //game.scoreTotal = game.scoreTotal + generation;

  if (game.pointScore > game.limits.Score) {
    game.pointScore = game.limits.Score;
  }

  updateConditions(game);
}

function updateConditions(game) {
  let points = game.pointScore;
  let limits = game.limitScoreTotal;
  let gen = game.totalStructures;

  condenseConditions(false, true, Buttons.Extend);
  condenseConditions(false, true, Displays.BarExtend);
  condenseConditions(false, true, Buttons.SideStats);

  //Structures
  condenseConditions(limits, 4, Displays.StructureContainer);
  condenseConditions(limits, 24, Buttons.Structures[1]);
  condenseConditions(limits, 84, Buttons.Structures[2]);
  condenseConditions(limits, 224, Buttons.Structures[3]);
  condenseConditions(limits, 794, Buttons.Structures[4]);

  //Upgrades
  condenseConditions(false, true, Buttons.UpgradesInfo[0]);
  //SL1
  condenseConditions(limits, 10, Displays.TabControlLimit);
  condenseConditions(gen[1], 0, Buttons.UpgradesStructures[1]);
  condenseConditions(gen[2], 0, Buttons.UpgradesStructures[2]);
  condenseConditions(gen[3], 0, Buttons.UpgradesStructures[3]);
  condenseConditions(gen[4], 0, Buttons.UpgradesStructures[4]);
  //QL1
  condenseConditions(game.frameCount, 1e4, Buttons.UpgradesLimits[0]);
  condenseConditions(game.upgradesQL1[2], 0, Buttons.UpgradesLimits[1]);
  condenseConditions(gen[1], 0, Buttons.UpgradesLimits[2]);
  condenseConditions(limits, 120, Buttons.UpgradesLimits[3]);
  condenseConditions(game.upgradesQL1[3], 0, Buttons.UpgradesLimits[4]);

  function condenseConditions(score, minScore, button) {
    //button can be display
    if (score > minScore) {
      button.show();
    } else {
      button.hide();
    }
  }

  function condenseBought(button, bought) {
    if (bought == true) {
      button.addClass("bought");
    } else {
      button.removeClass("bought");
    }
  }

  //Tab Stuff
  switch (game.options.tabIndex[0]) {
    case 0: //limit
      Displays.TabLimit.show();
      Buttons.Limit.addClass("inTab");
      Displays.TabExtend.hide();
      Buttons.Extend.removeClass("inTab");
      Displays.TabOptions.hide();
      Buttons.Options.removeClass("inTab");
      Displays.TabVersion.hide();
      break;

    case 1: //extend
      Displays.TabLimit.hide();
      Buttons.Limit.removeClass("inTab");
      Displays.TabExtend.show();
      Buttons.Extend.addClass("inTab");
      Displays.TabOptions.hide();
      Buttons.Options.removeClass("inTab");
      Displays.TabVersion.hide();
      break;

    case 8: //options
      Displays.TabLimit.hide();
      Buttons.Limit.removeClass("inTab");
      Displays.TabExtend.hide();
      Buttons.Extend.removeClass("inTab");
      Displays.TabOptions.show();
      Buttons.Options.addClass("inTab");
      Displays.TabVersion.hide();
      break;

    case 9: //version
      Displays.TabLimit.hide();
      Buttons.Limit.removeClass("inTab");
      Displays.TabExtend.hide();
      Buttons.Extend.removeClass("inTab");
      Displays.TabOptions.hide();
      Buttons.Options.removeClass("inTab");
      Displays.TabVersion.show();
      break;

    default:
      Displays.TabLimit.show();
      Buttons.Limit.addClass("inTab");
      Displays.TabExtend.hide();
      Buttons.Extend.removeClass("inTab");
      Displays.TabOptions.hide();
      Buttons.Options.removeClass("inTab");
      Displays.TabVersion.hide();
      break;
  }

  switch (game.options.tabIndex[1]) {
    case 0:
      Displays.TabStructures.show();
      Buttons.btnStructures.addClass("inTab");
      Displays.TabUpgrades.hide();
      Buttons.btnUpgrades.removeClass("inTab");

      break;
    case 1:
      Displays.TabStructures.hide();
      Buttons.btnStructures.removeClass("inTab");
      Displays.TabUpgrades.show();
      Buttons.btnUpgrades.addClass("inTab");

      break;
    case 2:
      Displays.TabStructures.hide();
      Buttons.btnStructures.removeClass("inTab");
      Displays.TabUpgrades.hide();
      Buttons.btnUpgrades.removeClass("inTab");

      break;
    default:
      Displays.TabStructures.show();
      Buttons.btnStructures.addClass("inTab");
      Displays.TabUpgrades.hide();
      Buttons.btnUpgrades.removeClass("inTab");

      break;
  }
}

function updateData(Displays, game) {
  //(Displays, game)
  let QL1Val = Constructs.upgradesDisplay("QL1 CE", 0);
  if (game.upgradesQL1[0] > 0 && game.frameCount % Math.floor(QL1Val[1]) == 0) {
    simClick();
    //console.log("hover")
  }
  if (game.upgradesQL1[1] >= 1 && game.frameCount % 10 == 0) {
    //if "W" keydown
    //simClick();
    Mousetrap.bind("w", holdClick);
  }

  updateGeneration(game);

  condenseDisplayFormat(Displays.DisplayScorePoint, game.pointScore, 5);
  condenseDisplayFormat(Displays.DisplayScoreLimit, game.limits.Score, 5);

  if (hover == false) {
    condenseAppend(
      Displays.DisplayProductionPoint,
      condenseDisplayFormatOut(Constructs.structuresGen(game.structures), 5),
      " Points/s"
    );
  } else if (hover == true) {
    condenseAppend(
      Displays.DisplayProductionPoint,
      condenseDisplayFormatOut(
        Constructs.structuresGen(game.structures) / game.limits.Score,
        5
      ),
      " Limits/s"
    );
  }

  condenseArrayDisplayFormat(
    Displays.StructureCosts,
    Constructs.structuresDisplay(game.structures, "cost"),
    5
  );

  condenseArrayDisplayFormat(
    Displays.StructureGeneration,
    Constructs.structuresDisplay(game.structures, "gen"),
    5
  );

  condenseArrayDisplayFormat(
    Displays.StructureOwn,
    Constructs.structuresDisplay(game.structures, "own"),
    10
  );

  Constructs.upgradesStructs(game.upgradesSL1);
  Constructs.upgradesLimits(game.upgradesQL1);

  condenseProgressBar("barLimitProgress", game.pointScore, game.limits.Score);
  Buttons.Save.text(
    "Save  ( " + game.frameSaveCount.toString().padStart(3, "0") + " / 1000 )"
  );

  function condenseDisplayFormat(display, score, precision) {
    if (score >= 1e10) {
      display.text(
        Math.floor(score.toExponential(precision)).toLocaleString("en-US")
      );
    } else {
      display.text(score.toFixed(2).toLocaleString("en-US"));
    }
  }
  function condenseDisplayFormatOut(score, precision) {
    if (score >= 1e10) {
      return Math.floor(score.toExponential(precision)).toLocaleString("en-US");
    } else {
      return score.toFixed(2).toLocaleString("en-US");
    }
  }

  function condenseAppend(display, value, text) {
    display.text(value + text);
  }

  function condenseProgressBar(display, score1, score2) {
    let width = (score1 / score2) * 100;
    if (score2 == 0) {
      width = 100;
    }

    document.getElementById(display).innerText =
      (Math.floor(width * 100) / 100).toFixed(2) + "%";
    document.getElementById(display).style.width = width * 0.96 + "%";
  }

  function condenseArrayDisplayFormat(display, score, precision) {
    for (let i = 0; i < display.length; i++) {
      condenseDisplayFormat(display[i], score[i], precision);
    }
  }

  if (game.options.monospace == true) {
    Displays.Body.addClass("monospace");
  } else {
    Displays.Body.removeClass("monospace");
  }

  if (game.options.sidestats == true) {
    Displays.Statistics.show();
  } else {
    Displays.Statistics.hide();
  }
}

function tick() {
  game.frameCount++;
  game.frameSaveCount++;

  updateData(Displays, game);

  if (game.frameSaveCount >= 1000) {
    game.saveGame();
    //notification("Auto Saved.")

    game.frameSaveCount = 0;
  }
}
