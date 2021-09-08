// Import the fitbit builtins
import { me } from "appbit";
import * as activity from "user-activity";

// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let CountCounter = function(doc, settings) {

  // Fetch the digit handler
  let digitHandler = new utils.DigitDisplay(doc, "count_", "00000", "digit_shadow");

  // Fetch the decorative button element
  const ccb = doc.getElementsByClassName("count_count_button");
  // And the actual trigger
  const cct = doc.getElementById("count_count_but");
  // Move the trigger to layer 110 so that it is above the view change buttons
  utils.changeLayer(cct, 110);

  // Fetch the counter amount
  var count = settings.getOrElse("counterValue", 0);
  // A blank timer
  var held = 0;

  // function to draw the display
  this.draw = function() {
    // update the counter
    digitHandler.update(count);
    // and save the value
    settings.replaceSettings({"counterValue":count})
  };

  // Function to trigger if the button is set
  cct.addEventListener("mousedown", (evt) => {
    // cite the held time
    held = Date.now();
    // activate the buttons
    utils.animateElement(ccb, "select");
  });

  // Function to trigger if the button is unset
  cct.addEventListener("mouseup", (evt) => {
    // increase the counter
    count++;
    // Check if we are reseting the counter
    if ((Date.now() - held) > 1000) { count = 0; };
    // activate the button
    utils.animateElement(ccb, "unselect");
    // and update the step display
    this.draw();
  });

  //and draw the initial state
  this.draw();
};
