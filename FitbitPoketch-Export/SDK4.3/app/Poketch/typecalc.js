
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

  // Fetch the selected move type
  var moveTypeDisplay = settings.getOrElse("MoveTypeValue", 0);
  var typeOneDisplay = settings.getOrElse("TypeOneValue", 0);
  var typeTwoDisplay = settings.getOrElse("TypeTwoValue", 0);

  moveTypeText.text = numToType[moveTypeDisplay];
  typeOneText.text = numToType[typeOneDisplay];
  typeTwoText.text = numToType[typeTwoDisplay];

  // function to draw the display
  //this.draw = function() {
  //  // update the types
  //  moveTypeText.text = numToType[moveTypeDisplay];
  //  typeOneText.text = numToType[typeOneDisplay];
  //  typeTwoText.text = numToType[typeTwoDisplay];
  //  // and save the value
  //  settings.replaceSettings({"MoveTypeValue":moveTypeDisplay});
  //  settings.replaceSettings({"TypeOneValue":typeOneDisplay});
  //  settings.replaceSettings({"TypeTwoValue":typeTwoDisplay});
  //};

  // increment the move type on click
  mtb.addEventListener("click", (evt) => {
    // increment the type
    moveTypeDisplay = (moveTypeDisplay + 1 + numTypes) % numTypes;
    // animate the click
    utils.animateElement(moveTypeBut, "click");
    // and update the display
    moveTypeText.text = numToType[moveTypeDisplay];
    // save the type
    settings.replaceSettings({"MoveTypeValue":moveTypeDisplay})
  });

  // increment the first type on click
  otb.addEventListener("click", (evt) => {
    // animate the click
    utils.animateElement(typeOneBut, "click");
  });

  // increment the first type on click
  ttb.addEventListener("click", (evt) => {
    // animate the click
    utils.animateElement(typeTwoBut, "click");
  });
};
