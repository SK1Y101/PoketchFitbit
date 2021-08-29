// Import the fitbit builtins
import { me } from "appbit";
import * as activity from "user-activity";

// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let CountCounter = function(doc, settings) {

  // Fetch the elements that correspond to the counter
  const one = doc.getElementsByClassName("count_one");
  const ten = doc.getElementsByClassName("count_ten");
  const hun = doc.getElementsByClassName("count_hun");
  const tho = doc.getElementsByClassName("count_tho");
  const tth = doc.getElementsByClassName("count_tth");

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

  // function to update the counters
  let updateCount = function(count=0) {
    // fetch the steps
    count = utils.pad(count, "00000");
    // and update the digits
    utils.showDigit(tth, count[0]);
    utils.showDigit(tho, count[1]);
    utils.showDigit(hun, count[2]);
    utils.showDigit(ten, count[3]);
    utils.showDigit(one, count[4]);
  };

  // function to draw the display
  this.draw = function() {
    // update the counter
    updateCount(count);
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
