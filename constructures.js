let generation = [0, 0, 0, 0, 0, 0];
let perGen = [0, 0, 0, 0, 0, 0];
let structCost = [0, 0, 0, 0, 0, 0];
let structOwn = [0, 0, 0, 0, 0, 0];

let upgCostStruct = [0, 0, 0, 0, 0, 0];
let upgCostLimits = [0, 0, 0, 0, 0];
let upgEffectStruct = [0, 0, 0, 0, 0, 0];
let upgEffectLimits = [0, 0, 0, 0, 0];

export function structuresCost(index) {
  return structCost[index];
}

export function structuresGen(own) {
  let value = 0;
  let mult = upgEffectLimits[2] * Math.max(1, upgEffectLimits[3]);

  structOwn = own;

  perGen[0] = 1 + upgEffectStruct[0];
  perGen[1] = 5 + upgEffectStruct[1];
  perGen[2] = 25 + upgEffectStruct[2];
  perGen[3] = 125 + upgEffectStruct[3];
  perGen[4] = 750 * upgEffectStruct[4];

  generation[0] = own[0] * perGen[0];
  generation[1] = own[1] * perGen[1];
  generation[2] = own[2] * perGen[2];
  generation[3] = own[3] * perGen[3];
  generation[4] = own[4] * perGen[4];
  //value += Owned  * Base * Upgrades >>...
  value = generation.reduce((a, b) => a + b, 0) * mult + 1;

  return value;
}

export function structuresDisplay(own, mode) {
  switch (mode) {
    case "cost":
      structCost[0] = 10 + Math.floor(own[0] ** 1.1 * 1); //45, 210
      structCost[1] = 20 + Math.floor(own[1] ** 1.2 * 4); //1275, 7875
      structCost[2] = 50 + Math.floor(own[2] ** 1.3 * 16); //~125250~
      structCost[3] =
        125 + Math.floor(own[3] ** (1.4 - upgEffectStruct[3] / (27 * 40)) * 64); //45150
      structCost[4] =
        300 + Math.floor(own[4] ** (1.5 - upgEffectStruct[4] / 8) * 256);

      return structCost;
      break;

    case "gen":
      return generation;
      break;

    case "pergen":
      return perGen;
      break;

    case "own":
      return own;
      break;

    default:
      break;
  }
}

export function upgradesStructs(levels) {
  //Cost
  for (let i = 0; i < 5; i++) {
    upgCostStruct[i] = 5 - i + Math.floor(levels[i] ** (1 + (i + 1) / 10));
  }

  //Effect
  //Base * Level
  //Base = 3^ID
  //ID 4 is just Level
  for (let i = 0; i < 4; i++) {
    upgEffectStruct[i] = 4 ** i * levels[i];
  }
  upgEffectStruct[4] = levels[4] + 1;
}

export function upgradesLimits(levels) {
  //Uses QL1[]
  //Cost

  upgCostLimits[0] = 5 * (levels[0] + 2) ** 3;
  upgCostLimits[1] = 10 ** (2 + levels[1]);

  upgCostLimits[2] = 40 + Math.floor(8 ** levels[2] - 1);
  upgCostLimits[3] = 70 + (2 * levels[3]) ** 3;
  upgCostLimits[4] = 50 + Math.floor((4 * levels[4]) ** 3);

  //Effect
  //MQ1 (Meta: Quality 1)
  //Clicks the Gain Limit Button every time
  //your frameCount is divisible by 500 / level
  //Costs Points (like a milestone)

  upgEffectLimits[0] = 500 / levels[0];

  //MQ2
  //Level 1: Allows for a keybind to press Gain Limits each frame when held down
  //

  upgEffectLimits[1] = levels[1];

  //LL1 (Layer: Limit 1)
  //Doubles your Points gain per level (so *2^L)
  //Costs Limits

  upgEffectLimits[2] = 2 ** levels[2];

  //LL2
  //Multiplies Points gain based on Total Structures.
  let LL2Val = structOwn.reduce((a, b) => a + b, 0);

  upgEffectLimits[3] = LL2Val ** (0.2 * levels[3]);

  //LL3
  //Does something to your limit gain...

  upgEffectLimits[4] = (1 + levels[4]) ** 2;
}

export function upgradesDisplay(mode, id) {
  switch (
    mode // C = Cost, E = Effect
  ) {
    case "SL1 CE":
      return [upgCostStruct[id], upgEffectStruct[id]];
    case "SL1 C":
      return upgCostStruct[id];
    case "QL1 CE":
      return [upgCostLimits[id], upgEffectLimits[id]];
    case "QL1 C":
      return upgCostLimits[id];
  }
}
