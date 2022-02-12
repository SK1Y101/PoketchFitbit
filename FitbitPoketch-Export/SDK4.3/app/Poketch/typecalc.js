
// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let TypeCalc = function(doc) {

  // and the text elements
  const moveType = doc.getElementById("move_type");

  // fetch the buttons
  const moveTypeBut = doc.getElementById("move_type_but");
  // Move the layer 110 so that it is above the view change buttons
  utils.changeLayer(moveTypeBut, 110);

  // the type as a number
  const numToType = ["Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychich", "Bug", "Rock", "Ghost", "Dark", "Dragon", "Steel", "Fairy"];
  const numTypes = numToType.length;

  // Fetch the selected move type
  var moveTypeDisplay = settings.getOrElse("MoveTypeValue", 0);

  // function to draw the display
  this.draw = function() {
    // update the types
    moveType.text = numToType[moveTypeDisplay];
    // and save the value
    settings.replaceSettings({"MoveTypeValue":moveTypeDisplay});
  };

  // increment the move type on click
  moveTypeBut.addEventListener("click", (evt) => {
    // increment the type
    moveTypeDisplay = (moveTypeDisplay + 1 + numTypes) % numTypes;
    // and update the display
    this.draw();
  });
};
