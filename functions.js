export function updateData(Constructs) {
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

  updateGeneration(Constructs);

  condenseDisplayFormat(Displays.DisplayScorePoint, game.pointScore, 5);
  condenseDisplayFormat(Displays.DisplayScoreLimit, game.limits.Score, 5);

  if (game.hover == false) {
    condenseAppend(
      Displays.DisplayProductionPoint,
      condenseDisplayFormatOut(Constructs.structuresGen(game.structures), 5),
      " Points/s"
    );
  } else if (game.hover == true) {
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

export function updateConditions() {
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

export function updateGeneration(Constructs) {
  let generation = (1 + Constructs.structuresGen(game.structures)) / 100;
  game.pointScore = game.pointScore + generation;
  //game.scoreTotal = game.scoreTotal + generation;

  if (game.pointScore > game.limits.Score) {
    game.pointScore = game.limits.Score;
  }

  updateConditions();
}
