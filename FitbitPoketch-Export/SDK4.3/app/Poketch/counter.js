// Import the fitbit builtins
import { me } from "appbit";
import * as activity from "user-activity";

// Define any helper functions
import * as utils from "../../common/utils";

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

  // secondary interaction
  var secondInteract = settings.getOrElse("secondInteract", 0);
  var longPressTime = 0.001 * settings.getOrElse("longPressTime", 1000);
  var multiTapTime = 0.001 * settings.getOrElse("multiTapTime", 500);

  // function to draw the display
  this.draw = function() {
    // update the counter
    digitHandler.update(count);
    // and save the value
    settings.replaceSettings({"counterValue":count})
  };

  // update the settings
  this.updateSecondary = function(sec) { secondaryInteract = sec; };
  this.updateLongPress = function(longtime) { longPressTime = longtime; };
  this.updateMultiTap = function(multitime) { multiTapTime = multitime; };

  // secondary button object
  function secondaryButton(elem, primaryFunc, secondaryFunc) {
    this.elem = elem;
    this.pressed = Date.now();
    this.secondary = False;
    this.primaryFunc = primaryFunc;
    this.secondaryFunc = secondaryFunc;
    // 0 = long press, 1 = multiTap
    this.secondaryInteract = 0;
  };

  // if the button is clicked
  secondaryButton.prototype.press = function() {
    // if we are using multitap
    if (secondInteract == 1) {
      // the secondary function will be enabled if the button is pressed before multitap is exceeded
      this.secondary = ((Date.now() - this.pressed) < multiTapTime);
    };
    // log the press time
    this.pressed = Date.now();
    // animate
    utils.animateElement(this.elem, "select");
  };

  // if the button is unclicked
  secondaryButton.prototype.unpress = function() {
    // if we are using long press
    if (secondInteract == 0) {
      // then the secondary function will be enabled if the button is held for long enough
      this.secondary = ((Date.now() - this.pressed) > longPressTime))
    // chose which function to do
    if (this.secondary) {
      this.secondaryFunc();
      this.secondary = False;
    } else {
      this.primaryFunc();
    };
    // and animate
    utils.animateElement(this.elem, "unselect");
  };

  // set the counter to a secondary button
  var counterBut = new secondaryButton(ccb, function() { count++; }, function() { count = 1; });

  // Function to trigger if the button is set
  cct.addEventListener("mousedown", (evt) => {
    // press the button
    counterBut.press();
  });

  // Function to trigger if the button is unset
  cct.addEventListener("mouseup", (evt) => {
    // press the button
    counterBut.unpress();
    // and update the step display
    this.draw();
  });

  //and draw the initial state
  this.draw();
};
