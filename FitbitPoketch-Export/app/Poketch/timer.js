// Import the fitbit builtins
import { vibration } from "haptics";

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
  utils.changeLayer(strtBt, 110);
  utils.changeLayer(stopBt, 110);
  utils.changeLayer(restBt, 110);
  utils.animateElement(stopBut, "select");

  // Time buttons (aesthetic)
  let timeButs = doc.getElementsByClassName("time_change_but");
  let timeButsIcon = doc.getElementsByClassName("time_change_icon");
  // Time change buttons
  let minUpBut = doc.getElementById("timer_min_up_button");
  let minDownBut = doc.getElementById("timer_min_down_button");
  let secUpBut = doc.getElementById("timer_sec_up_button");
  let secDownBut = doc.getElementById("timer_sec_down_button");
  // change the layer height
  utils.changeLayer(minUpBut, 110);
  utils.changeLayer(minDownBut, 110);
  utils.changeLayer(secUpBut, 110);
  utils.changeLayer(secDownBut, 110);

  // Timer variable
  let timerVar = 0;
  let showArrow = false;
  let startTimer = false;

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
    digitHandler.update(sec2string(timerVar));
  };

  // Function to draw the snorlax when the timer has finished
  let timerEnd = function(left = true) {
    // If we haven't pressed stop
    if (startTimer) {
      // update the snorlax image
      snorlaxHref(left ? "left" : "right");
      // and set a timeout to call the function again
      setTimeout(function() {
        // call the function with the opposite thing
        timerEnd(!left);
        // and buzz the motor
        left ? vibration.start("nudge") : vibration.stop();
      }, 250);
    };
  };

  // Function to reduce the timer
  let timerLoop = function() {
    // If the timer is not at zero
    if (timerVar > 0) {
      // create a timeout function
      setTimeout(function() {
        // if we are still running
        if (startTimer) {
          // Decrement the timer
          timerVar--;
          // update the display
          digitHandler.update(sec2string(timerVar));
          // and execute again
          timerLoop();
        };
      }, 1000);
    } else {
      timerEnd();
    };
  };

  // function that executes on the start button press
  let buttonPress = function(startPress = false) {
    // activate the buttons
    utils.animateElement(strtBut, startPress ? "select" : "unselect");
    utils.animateElement(stopBut, startPress ? "unselect" : "select");
    // Change the snorlax image
    snorlaxHref(startPress ? "down" : "up");
    // set the start timer to the press
    startTimer = startPress;
  };

  // Function to set and update the display
  let updateDisplay = function(newTime = "false") {
    // set the time if given
    if (newTime != "false") {
      // ensure the timer is within the 99:59 possible timer
      timerVar = (newTime + 6000) % 6000;
    };
    // and draw
    digitHandler.update(sec2string(timerVar));
  };

  // function to toggle the showing of the arrow display
  let toggleArrows = function(display=true) {
    // if we want to show them
    if (showArrow) {
      // Show everything
      utils.showElement(timeButs, true);
      // set the display of the arrows to the function input
      utils.showElement(timeButsIcon, display);
      // and in 500 seconds
      setTimeout(function() {
        // call the function again with the opposite value
        toggleArrows(!display);
      }, 500);
    } else {
      // otherwise, hide them
      utils.showElement(timeButs, false);
    };
  };

  // Event listeners
  // Start click
  strtBt.addEventListener("click", (evt) => {
    // make the selection arrows invisible
    showArrow = false;
    toggleArrows();
    // check we have a timer that can count down.
    if (timerVar > 0) {
      // Update the buttons
      buttonPress(true);
      // start the timer
      timerLoop();
    } else {
      // otherwise, animate it clicking
      utils.animateElement(strtBut, "click");
    };
  });

  // Stop click
  stopBt.addEventListener("click", (evt) => {
    // activate the buttons
    buttonPress(false);
  });

  // Reset click
  restBt.addEventListener("click", (evt) => {
    // activate the buttons
    utils.animateElement(restBut, "click");
    // deal with the other button stuff too
    buttonPress(false);
    // set the timerVariable.
    updateDisplay(0);
    // make the selection arrows visible on a timer
    showArrow = true;
    toggleArrows();
  });

  // Increment minute button
  minUpBut.addEventListener("click", (evt) => {
    // Increment the timer by 60 seconds
    updateDisplay(timerVar + 60);
  });

  // Increment minute button
  minDownBut.addEventListener("click", (evt) => {
    // Increment the timer by 60 seconds
    updateDisplay(timerVar - 60);
  });

  // Increment Second button
  secUpBut.addEventListener("click", (evt) => {
    // Increment the timer by 60 seconds
    updateDisplay(timerVar + 1);
  });

  // Increment Second button
  secDownBut.addEventListener("click", (evt) => {
    // Increment the timer by 60 seconds
    updateDisplay(timerVar - 1);
  });
};
