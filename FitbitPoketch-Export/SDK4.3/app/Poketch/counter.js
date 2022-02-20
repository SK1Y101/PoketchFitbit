// Import the fitbit builtins
import { me } from "appbit";
import * as activity from "user-activity";

// Define any helper functions
import * as utils from "../../common/utils";
import { SecondaryButton } from "./secondFunctionButton";

// get the secondary button reference
let counterButton = new SecondaryButton();

// Define this module
export let CountCounter = function(doc, settings, debug=false) {

  // Fetch the digit handler
  let digitHandler = new utils.DigitDisplay(doc, "count_", "00000", "digit_shadow");

  // Fetch the decorative button element
  const ccb = doc.getElementsByClassName("count_count_button");
  // And the actual trigger
  const cct = doc.getElementById("count_count_but");
  // Move the trigger to layer 110 so that it is above the view change buttons
  utils.changeLayer(cct, 110);

  // Fetch the counter amount
  var count =  debug ? 31415 : settings.getOrElse("counterValue", 0);
  // try the secondary button
  var secondInteract = parseInt(settings.getOrElse("counterValue", "0"));
  var longPressTime = parseInt(settings.getOrElse("counterValue", "1000"));
  var multiTapTime = parseInt(settings.getOrElse("counterValue", "500"));

  // update the secondary setting
  this.updateSecondary = function(sec) { secondInteract = sec; };

  // update the long press time
  this.updateLongPress = function(timeselect) { longPressTime = timeselect; };

  // update the long press time
  this.updateMultiTap = function(timeselect) { multiTapTime = timeselect; };

  // function to draw the display
  this.draw = function() {
    // update the counter
    digitHandler.update(count);
    // and save the value
    settings.replaceSettings({"counterValue":count})
  };

  // Function to trigger if the button is set
  cct.addEventListener("mousedown", (evt) => {
    // press the button
    counterButton.press(secondInteract, multiTapTime);
    // activate the buttons
    utils.animateElement(ccb, "select");
  });

  // Function to trigger if the button is unset
  cct.addEventListener("mouseup", (evt) => {
    // unpress the button
    var func = counterButton.unpress(secondInteract, longPressTime);
    // primary function
    if (func) {
      // increase the counter
      count++;
    } else {
      // reset the counter
      count = 0;
    };
    // activate the button
    utils.animateElement(ccb, "unselect");
    // and update the step display
    this.draw();
  });

  //and draw the initial state
  this.draw();
};
