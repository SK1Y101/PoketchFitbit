
// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let TypeCalc = function(doc) {

  // fetch the button container
  //const moveTypeBut = doc.getElementsByClassName("move_type_button")

  // Fetch the text on a button
  const moveTypeText = doc.getElementById("move_type_text");
  moveTypeText.text = "Normal";

  // And the actual trigger
  //const mtb = doc.getElementById("move_type_but");
  // Move the trigger to layer 110 so that it is above the view change buttons
  //utils.changeLayer(mtb, 150);

  // the type as a number
  //const numToType = ["Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dark", "Dragon", "Steel", "Fairy"];
  //const numTypes = numToType.length;

  // Fetch the selected move type
  //var moveTypeDisplay = 0; //settings.getOrElse("MoveTypeValue", 0);

  // function to draw the display
  this.draw = function() {
    // update the types
    //moveTypeText.text = numToType[moveTypeDisplay];
    // and save the value
    //settings.replaceSettings({"MoveTypeValue":moveTypeDisplay});
  };

  // increment the move type on click
  //mtb.addEventListener("click", (evt) => {
  //  // increment the type
  //  moveTypeDisplay = (moveTypeDisplay + 1 + numTypes) % numTypes;
  //  // animate the click
  //  utils.animateElement(moveTypeBut, "click");
  //  // and update the display
  //  this.draw();
  //});

  // and draw on intitalisation
  //draw();
};
