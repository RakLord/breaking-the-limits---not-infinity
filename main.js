import { Game } from "./game.js";
import { Texts } from "./texts.js";
import * as Constructs from "./constructures.js";
import "./mousetrap.js";
import { updateData } from "./functions.js";


$(document).ready(function () {
  console.log("Debug message");
  init();
  setInterval(tick, 10);

  //setInterval(tick,50);
});

function init() {
  window.game = new Game();
  window.texts = new Texts();
  window.Displays = {};
  window.Buttons = {};

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
        game.totalStructures[i] += 1;
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
    game.hover = !game.hover;
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

function tick() {
  game.frameCount++;
  game.frameSaveCount++;

  updateData(Constructs);

  if (game.frameSaveCount >= 1000) {
    game.saveGame();
    //notification("Auto Saved.")

    game.frameSaveCount = 0;
  }
}
