
// Define any helper functions
import * as utils from "../../common/utils";
import { SecondaryButton } from "./secondFunctionButton";

// get the secondary button reference
let moveButton = new SecondaryButton();
let typeOneButton = new SecondaryButton();
let typeTwoButton = new SecondaryButton();

// Define this module
export let TypeCalc = function(doc, settings, debug=false) {

  // fetch the button container
  const moveTypeBut = doc.getElementsByClassName("move_type_button");
  const typeOneBut = doc.getElementsByClassName("type_one_button");
  const typeTwoBut = doc.getElementsByClassName("type_two_button");

  // Fetch the text on a button
  const moveTypeText = doc.getElementById("move_type_text");
  const typeOneText = doc.getElementById("type_one_text");
  const typeTwoText = doc.getElementById("type_two_text");

  // Fetch the effectiveness display
  const effectiveDisplay = doc.getElementById("effectiveness_display");
  const effectiveText = doc.getElementById("effectiveness_display_text");
  effectiveDisplay.href = "icons/effectiveness_3.png";
  effectiveText.text = "Regularaly effective";

  // And the actual trigger
  const mtb = doc.getElementById("move_type_but");
  const otb = doc.getElementById("type_one_but");
  const ttb = doc.getElementById("type_two_but");
  utils.changeLayer(mtb, 110);
  utils.changeLayer(otb, 110);
  utils.changeLayer(ttb, 110);

  // the type as a number
  const numToType = ["Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"];
  const effToText = ["Not effective", "Not very effective", "Regularaly effective", "Super effective"];
  const numTypes = numToType.length;
  // store the weakness table. Row defines attacker, column defines defender
  const weakness = [[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 2, 2, 1, 2],
                    [2, 1, 1, 2, 4, 4, 2, 2, 2, 2, 2, 4, 1, 2, 1, 2, 4, 2],
                    [2, 4, 1, 2, 1, 2, 2, 2, 4, 2, 2, 2, 4, 2, 1, 2, 2, 2],
                    [2, 2, 4, 1, 1, 2, 2, 2, 0, 4, 2, 2, 2, 2, 1, 2, 2, 2],
                    [2, 1, 4, 2, 1, 2, 2, 1, 4, 1, 2, 1, 4, 2, 1, 2, 1, 2],
                    [2, 1, 1, 2, 4, 1, 2, 2, 4, 4, 2, 2, 2, 2, 4, 2, 1, 2],
                    [4, 2, 2, 2, 2, 4, 2, 1, 2, 1, 1, 1, 4, 0, 2, 4, 4, 1],
                    [2, 2, 2, 2, 4, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 0, 4],
                    [2, 4, 2, 4, 1, 2, 2, 4, 2, 0, 2, 1, 4, 2, 2, 2, 4, 2],
                    [2, 2, 2, 1, 4, 2, 4, 2, 2, 2, 2, 4, 1, 2, 2, 2, 1, 2],
                    [2, 2, 2, 2, 2, 2, 4, 4, 2, 2, 1, 2, 2, 2, 2, 0, 1, 2],
                    [2, 1, 2, 2, 4, 2, 1, 1, 2, 1, 4, 2, 2, 1, 2, 4, 1, 1],
                    [2, 4, 2, 2, 2, 4, 1, 2, 1, 4, 2, 4, 2, 2, 2, 2, 1, 2],
                    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 4, 2, 1, 2, 2],
                    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 1, 0],
                    [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 4, 2, 2, 4, 2, 1, 2, 1],
                    [2, 1, 1, 1, 2, 4, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 1, 4],
                    [2, 1, 2, 2, 2, 2, 4, 1, 2, 2, 2, 2, 2, 2, 4, 4, 1, 2],];

  // Fetch the selected move type
  var moveTypeDisplay = settings.getOrElse("MoveTypeValue", 0);
  var typeOneDisplay = settings.getOrElse("TypeOneValue", 0);
  var typeTwoDisplay = settings.getOrElse("TypeTwoValue", 0);
  // the secondary button settings
  var secondInteract = parseInt(settings.getOrElse("counterValue", "0"));
  var longPressTime = parseInt(settings.getOrElse("counterValue", "1000"));
  var multiTapTime = parseInt(settings.getOrElse("counterValue", "500"));

  // update the secondary setting
  this.updateSecondary = function(sec) { secondInteract = sec; };
  this.updateLongPress = function(timeselect) { longPressTime = timeselect; };
  this.updateMultiTap = function(timeselect) { multiTapTime = timeselect; };

  // compute effectiveness
  let compEffect = function(move_type, type_one, type_two) {
    var eff_row = weakness[move_type];
    return eff_row[type_one] * ((type_one == type_two) ? 2 : eff_row[type_two]);
  };

  // change effectiveness given typings
  let changeEffect = function() {
    // fetch the weaknesses and convert to unique int
    var effectiveness = compEffect(moveTypeDisplay, typeOneDisplay, typeTwoDisplay);
    // set href based on effectiveness
    if (effectiveness == 16) {
      effectiveDisplay.href = "icons/effectiveness_5.png";
      effectiveText.text = effToText[3];
    } else if (effectiveness == 8 ) {
      effectiveDisplay.href = "icons/effectiveness_4.png";
      effectiveText.text = effToText[3];
    } else if (effectiveness == 4 ) {
      effectiveDisplay.href = "icons/effectiveness_3.png";
      effectiveText.text = effToText[2];
    } else if (effectiveness == 2) {
      effectiveDisplay.href = "icons/effectiveness_2.png";
      effectiveText.text = effToText[1];
    } else if (effectiveness == 1) {
      effectiveDisplay.href = "icons/effectiveness_1.png";
      effectiveText.text = effToText[1];
    } else {
      effectiveDisplay.href = "icons/effectiveness_0.png";
      effectiveText.text = effToText[0];
    };
  };

  // update the buttons So they show the correct type values
  let updateTyping = function() {
    // update text saved
    settings.replaceSettings({"MoveTypeValue":moveTypeDisplay});
    settings.replaceSettings({"TypeOneValue":typeOneDisplay});
    settings.replaceSettings({"TypeTwoValue":typeTwoDisplay});
    // and update the display after 150 ms
    moveTypeText.text = numToType[moveTypeDisplay];
    typeOneText.text = numToType[typeOneDisplay];
    typeTwoText.text = numToType[typeTwoDisplay];
    // compute the effectiveness
    changeEffect();
  };
  updateTyping();

  // -----< Move Typing >-----
  mtb.addEventListener("mousedown", (evt) => {
    // press the button
    moveButton.press(secondInteract, multiTapTime);
    // animate
    utils.animateElement(moveTypeBut, "select");
  });

  mtb.addEventListener("mouseup", (evt) => {
    // unpress the button
    var func = moveButton.unpress(secondInteract, longPressTime);
    // primary function
    if (func) {
      // increment
      moveTypeDisplay = (moveTypeDisplay + 1 + numTypes) % numTypes;
    } else {
      // reset the counter
      moveTypeDisplay = 0;
    };
    // update the display
    utils.animateElement(moveTypeBut, "unselect"); updateTyping();
  });

  // -----< First Typing >-----
  otb.addEventListener("mousedown", (evt) => {
    // press the button
    typeOneButton.press(secondInteract, multiTapTime);
    // animate
    utils.animateElement(typeOneBut, "select");
  });

  otb.addEventListener("mouseup", (evt) => {
    // unpress the button
    var func = typeOneButton.unpress(secondInteract, longPressTime);
    // primary function
    if (func) {
      // increment
      typeOneDisplay = (typeOneDisplay + 1 + numTypes) % numTypes;
    } else {
      // reset the counter
      typeOneDisplay = 0;
    };
    // update the display
    utils.animateElement(typeOneBut, "unselect"); updateTyping();
  });

  // -----< Second Typing >-----
  ttb.addEventListener("mousedown", (evt) => {
    // press the button
    typeTwoButton.press(secondInteract, multiTapTime);
    // animate
    utils.animateElement(typeTwoBut, "select");
  });

  ttb.addEventListener("mouseup", (evt) => {
    // unpress the button
    var func = typeTwoButton.unpress(secondInteract, longPressTime);
    // primary function
    if (func) {
      // increment
      typeTwoDisplay = (typeTwoDisplay + 1 + numTypes) % numTypes;
    } else {
      // reset the counter
      typeTwoDisplay = 0;
    };
    // update the display
    utils.animateElement(typeTwoBut, "unselect"); updateTyping();
  });
};
