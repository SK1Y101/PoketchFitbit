// Import the fitbit builtins

// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let KitchenTimer = function(doc) {
  // Fetch the digit handler
  let digitHandler = new utils.DigitDisplay(doc, "timer_", "0000", "digit_shadow");

  // Snorlax image
  let snorlax = doc.getElementById("timer_snorlax");

  // Bottom buttons (Aesthetic)
  let strtBut = doc.getElementById("timer_start_button");
  let stopBut = doc.getElementById("timer_stop_button");
  let restBut = doc.getElementById("timer_reset_button");
  // Bottom buttons (activated)
  let strtBt = doc.getElementById("timer_start_but");
  let stopBt = doc.getElementById("timer_stop_but");
  let restBt = doc.getElementById("timer_reset_but");
  // Change the layer height
  utils.changeLayer(strtBt, 120);
  utils.changeLayer(stopBt, 121);
  utils.changeLayer(restBt, 122);
  utils.animateElement(stopBut, "select");

  // Function to replace the snorlax href
  let snorlaxHref = function(text="down") {
    snorlax.href = snorlax.href.splice(snorlax.href.indexOf("_")+1, snorlax.href.indexOf("."), text);
  };

  // Function to convert a time in seconds to the digit handler
  let sec2string = function(times=10) {
    let secs = times % 60; let mins = ~~(times / 60);
    // set the string
    return ~~(mins / 10) + "" + mins % 10 + "" + ~~(secs / 10) + "" + secs % 10;
  };

  // function to draw the display
  this.draw = function() {
  };

  // Event listeners
  // Start click
  strtBt.addEventListener("click", (evt) => {
    // activate the buttons
    utils.animateElement(strtBut, "select");
    utils.animateElement(stopBut, "unselect");
    // Change the snorlax image
    snorlaxHref("down");
    console.log("start click");
  });
  // Stop click
  stopBt.addEventListener("click", (evt) => {
    // activate the buttons
    utils.animateElement(stopBut, "select");
    utils.animateElement(strtBut, "unselect");
    // Change the snorlax image
    snorlaxHref("up");
    console.log("stop click");
  });
  // Reset click
  restBt.addEventListener("click", (evt) => {
    // activate the buttons
    utils.animateElement(restBut, "click");
    digitHandler.update(sec2string(185));
    console.log("reset click");
  });
};
