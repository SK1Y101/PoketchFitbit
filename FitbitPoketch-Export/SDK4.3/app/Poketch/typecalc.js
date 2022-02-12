
// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let TypeCalc = function(doc, settings) {

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
  effectiveDisplay.href = "icons/effectiveness_3.png";

  // And the actual trigger
  const mtb = doc.getElementById("move_type_but");
  const otb = doc.getElementById("type_one_but");
  const ttb = doc.getElementById("type_two_but");
  utils.changeLayer(mtb, 110);
  utils.changeLayer(otb, 110);
  utils.changeLayer(ttb, 110);

  // the type as a number
  const numToType = ["Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dark", "Dragon", "Steel", "Fairy"];
  const numTypes = numToType.length;
  // store the weakness table. Row defines attacker, column defines defender
  const weakness = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,.5, 0, 1, 1,.5, 1],
                    [1,.5,.5, 1, 2, 2, 1, 1, 1, 1, 1, 2,.5, 1,.5, 1, 2, 1],
                    [1, 2,.5, 1,.5, 1, 1, 1, 2, 1, 1, 1, 2, 1,.5, 1, 1, 1],
                    [1, 1, 2,.5,.5, 1, 1, 1, 0, 2, 1, 1, 1, 1,.5, 1, 1, 1],
                    [1,.5, 2, 1,.5, 1, 1,.5, 2,.5, 1,.5, 2, 1,.5, 1,.5, 1],
                    [1,.5,.5, 1, 2,.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1,.5, 1],
                    [2, 1, 1, 1, 1, 2, 1,.5, 1,.5,.5,.5, 2, 0, 1, 2, 2,.5],
                    [1, 1, 1, 1, 2, 1, 1,.5,.5, 1, 1, 1,.5,.5, 1, 1, 0, 2],
                    [1, 2, 1, 2,.5, 1, 1, 2, 1, 0, 1,.5, 2, 1, 1, 1, 2, 1],
                    [1, 1, 1,.5, 2, 1, 2, 1, 1, 1, 1, 2,.5, 1, 1, 1,.5, 1],
                    [1, 1, 1, 1, 1, 1, 2, 2, 1, 1,.5, 1, 1, 1, 1, 0,.5, 1],
                    [1,.5, 1, 1, 2, 1,.5,.5, 1,.5, 2, 1, 1,.5, 1, 2,.5,.5],
                    [1, 2, 1, 1, 1, 2,.5, 1,.5, 2, 1, 2, 1, 1, 1, 1,.5, 1],
                    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1,.5, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,.5, 0],
                    [1, 1, 1, 1, 1, 1,.5, 1, 1, 1, 2, 1, 1, 2, 1,.5, 1,.5],
                    [1,.5,.5,.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1,.5, 2],
                    [1,.5, 1, 1, 1, 1, 2,.5, 1, 1, 1, 1, 1, 1, 2, 2,.5, 1],];

  // Fetch the selected move type
  var moveTypeDisplay = settings.getOrElse("MoveTypeValue", 0);
  var typeOneDisplay = settings.getOrElse("TypeOneValue", 0);
  var typeTwoDisplay = settings.getOrElse("TypeTwoValue", 0);
  var held = 0;

  // compute effectiveness given typings
  let fetchEffect = function() {
    // fetch the weaknesses
    effectiveness = weakness[moveTypeDisplay][typeOneDisplay];
    // if the opponent has two different types, multiply the effectiveness
    if (typeOneDisplay != typeTwoDisplay) {
      effectiveness = effectiveness * weakness[moveTypeDisplay][typeTwoDisplay];
    };
    // change the effectiveness to an integer
    effectiveness = Math.round(4*fetchEffect());
    // set href based on effectiveness
    if (effectiveness == 16) {
      effectiveDisplay.href = "icons/effectiveness_5.png";
    } else if (effectiveness == 8 ) {
      effectiveDisplay.href = "icons/effectiveness_4.png";
    } else if (effectiveness == 4 ) {
      effectiveDisplay.href = "icons/effectiveness_3.png";
    } else {
      effectiveDisplay.href = "icons/effectiveness_"+effectiveness+".png";
    };
  };

  // update the buttons So they show the correct type values
  let updateTyping = function() {
    // update text saved
    settings.replaceSettings({"MoveTypeValue":moveTypeDisplay});
    settings.replaceSettings({"TypeOneValue":typeOneDisplay});
    settings.replaceSettings({"TypeTwoValue":typeTwoDisplay});
    setTimeout(function() {
      // and update the display after 150 ms
      moveTypeText.text = numToType[moveTypeDisplay];
      typeOneText.text = numToType[typeOneDisplay];
      typeTwoText.text = numToType[typeTwoDisplay];
      // compute the effectiveness
      updateEffectivenessIcon();
    }, 150);
  };
  updateTyping();

  // -----< Move Typing >-----
  mtb.addEventListener("mousedown", (evt) => {
    // start a timer
    held = Date.now();
    // animate
    utils.animateElement(moveTypeBut, "select");
  });

  mtb.addEventListener("mouseup", (evt) => {
    // increment
    moveTypeDisplay = (moveTypeDisplay + 1 + numTypes) % numTypes;
    // reset if held
    if ((Date.now() - held) > 1000) { moveTypeDisplay = 0; };
    // update the display
    utils.animateElement(moveTypeBut, "unselect"); updateTyping();
  });

  // -----< First Typing >-----
  otb.addEventListener("mousedown", (evt) => {
    // start a timer
    held = Date.now();
    // animate
    utils.animateElement(typeOneBut, "select");
  });

  otb.addEventListener("mouseup", (evt) => {
    // increment
    typeOneDisplay = (typeOneDisplay + 1 + numTypes) % numTypes;
    // reset if held
    if ((Date.now() - held) > 1000) { typeOneDisplay = 0; };
    // update the display
    utils.animateElement(typeOneBut, "unselect"); updateTyping();
  });

  // -----< Second Typing >-----
  ttb.addEventListener("mousedown", (evt) => {
    // start a timer
    held = Date.now();
    // animate
    utils.animateElement(typeTwoBut, "select");
  });

  ttb.addEventListener("mouseup", (evt) => {
    // increment
    typeTwoDisplay = (typeTwoDisplay + 1 + numTypes) % numTypes;
    // reset if held
    if ((Date.now() - held) > 1000) { typeTwoDisplay = 0; };
    // update the display
    utils.animateElement(typeTwoBut, "unselect"); updateTyping();
  });
};
