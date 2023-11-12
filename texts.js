//Use this to clear bulk overflows or tooltips
export class Texts {
  upgradeDescLimits(id, dispTitle, dispDesc) {
    switch (id) {
      case 0:
        dispTitle.text("MQ1: Cursor");
        dispDesc.html(
          "<p>Buy a cursor that helps you to click the Gain Limits button, " +
            "every few game frames.</p><p>Effect Formula: <strong>200 / Level</strong> frames."
        );
        break;

      case 1:
        dispTitle.text("MQ2: Gift Box");
        dispDesc.html(
          "<p>Unlocks some stuff to help progression.</p><p>Level 1: " +
            "Unlocks the ability to click the Gain Limits button every few frames, " +
            'while holding "W".</p>'
        );
        break;

      case 2:
        dispTitle.text("LL1: Mitosis");
        dispDesc.html(
          "Structures function like cells, and can duplicate!" +
            "<p>Doubles Points Generation per level.</p><p>This might not help our " +
            "Limits in the long run...</p>"
        );
        break;

      case 3:
        dispTitle.text("LL2: Network");
        dispDesc.html(
          "<p>Structures function better when clumped up together.</p>" +
            "<p>Multiplies Points Generation based on</p>" +
            "<p><strong>Total Structures ^ (0.15 * Level)</strong></p>"
        );
        break;

      case 4:
        dispTitle.text("LL3: Break the Limits a bit more...");
        dispDesc.html(
          "<p>Gain more Limits every time you gain Limits." +
            "</p><p><strong>(1 + Level) ^ 2</strong></p>"
        );
        break;

      default:
        dispTitle.text("You are not supposed to be here.");
        dispDesc.html(id);
        break;
    }
  }

  upgradeDescStructures(id, dispTitle, dispDesc) {
    switch (id) {
      case 0:
        dispTitle.text("S11: Sharper Points");
        dispDesc.html(
          "<p>They're pointy!<br/>" +
            "Increase Another Point base generation by 1.</p>"
        );
        break;

      case 1:
        dispTitle.text("S21: Arrows for Lines");
        dispDesc.html(
          "<p>Lines follow Points and grow sharp tips! This might hurt " +
            "a bit...<br/>Increase Lines base generation by 3.</p>"
        );
        break;

      case 2:
        dispTitle.text("S31: Cookies, Clicked, Circles!");
        dispDesc.html(
          "<p>I don't have a punchline for this...<br/>" +
            "Increases Circle base generation by 9.</p>"
        );
        break;

      case 3:
        dispTitle.text("S41: Gradient Tool");
        dispDesc.html(
          "<p>Save some more effort, buy some colour combinations!<br/>" +
            "Increase Plane base generation by 27, and make their " +
            "cost scaling <b>0.025</b> slower!</p>"
        );
        break;

      case 4:
        dispTitle.text("S51: BREAK IN CASE OF EMERGENCY.");
        dispDesc.html(
          "<p>Increases Limit Breaker's Speed by +100% per level.<br/>" +
            "Cost scaling goes <b>0.125</b> slower.<br/>" +
            "Final Level unlocks something in v0.0.5...</p>"
        );
        break;

      default:
        dispTitle.text("You are not supposed to be here.");
        dispDesc.html(id);
        break;
    }
  }

  versionGame(display) {
    let changelog001 = //function VersionLog(versionID, changelog)
      '<hr/><div class="changelog"><p><strong>Version 0.0.1</strong> Testing the Limits.</p>' +
      "<p>Created the page structure, and created the most simple of gameplay " +
      "loops.</p>" +
      "<p>Click the button when Point = Limit to gain 1 Limit.</p><br/>" +
      "<p>Credits to <b>rak.exe</b> for the support and help in building " +
      "the initial code that this project began with.</p><br/>" +
      "<p>Tried setInterval instead of requestAnimationFrame.</p></div><hr/>";

    let changelog002 =
      '<hr/><div class="changelog"><p><strong>Version 0.0.2</strong> Structures.</p>' +
      "<p>Added Structures.</p> <p>Added framework for the Upgrades Panel.</p>" +
      "<p>This update seems rushed, but next update is Upgrades!</p></div><hr/>";

    let changelog003 =
      '<hr/><div class="changelog"><p><strong>Version 0.0.3</strong> Upgrades.</p>' +
      '<p title="You do not want to know how hard it was to get the actual ' +
      'frameworks done... But thanks, Alvar and Rak."><strong></strong>' +
      "Added 10 Upgrades. 5 for Structures, 2 Quality of Life, 3 Limit Layer.</p>" +
      "<p>Sub tabs now exist. Thanks UI problems.</p>" +
      "<p>Adjusted Structure names, and Limit Breaker's cost. (now it costs " +
      "~3x less points).</p><p>Made <strong>Progress Bar %</strong> " +
      "and many other things toFixed(2).</p>" +
      '<p title="hover\nhover\nhover\nhover\nhover\nhover\nhover\nhover\nhover' +
      "\nhover\nhover\nhover\nhover\nhover\nhover\nhover\nhover\nhover\nhover" +
      '\nhover">UQ1 was buffed for unexpected reasons, but thank the code that ' +
      "you didn't have to see <strong>that</strong> in this version.</p>" +
      "<p>Responsive design, ignore the todo.</p>" +
      "<p>Savefile upgrades with every version from now on, it may seem...</p></div><hr/>";

    display.html(changelog003 + changelog002 + changelog001);
  }
}
