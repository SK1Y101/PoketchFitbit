// Import the fitbit builtins
import { me } from "appbit";
import * as activity from "user-activity";

// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let StepCounter = function(doc, settings) {
  // Fetch the elements that correspond to the counter
  const one = doc.getElementsByClassName("step_one");
  const ten = doc.getElementsByClassName("step_ten");
  const hun = doc.getElementsByClassName("step_hun");
  const tho = doc.getElementsByClassName("step_tho");
  const tth = doc.getElementsByClassName("step_tth");

  // Fetch the decorative button element
  const csb = doc.getElementsByClassName("clear_screen_button");
  // And the actual trigger
  const cst = doc.getElementById("clear_screen_but");
  // Move the trigger to layer 110 so that it is above the view change buttons
  utils.changeLayer(cst, 110);

  // Fetch whether we are showing the total steps or offset steps
  var stepView = settings.getOrElse("stepView", 0);
  // Fetch the step offset
  var offset = 5400;//settings.getOrElse("stepOffset", 0);
  // A blank timer
  var held = 0;

  // function to update the counters
  let updateCount = function(steps=0) {
    // fetch the steps
    steps = utils.pad(steps, "00000");
    // and update the digits
    utils.showDigit(tth, steps[0]);
    utils.showDigit(tho, steps[1]);
    utils.showDigit(hun, steps[2]);
    utils.showDigit(ten, steps[3]);
    utils.showDigit(one, steps[4]);
  };

  let newOffset = function(ost = 0) {
    offset = ost; settings.replaceSettings({"stepOffset":offset})
  };

  // function to draw the steps on screen
  this.draw = function() {
    // Check we have permissions
    if (me.permissions.granted("access_activity")) {
      // Fetch the number of steps
      var steps = activity.today.adjusted.steps;
      // update the offset (ie: ie we rolled over to midnight)
      if (offset == -1)   { newOffset(steps); };
      if (steps < offset) { newOffset(0); };
      // And show the desired step counter
      if (stepView == 0) {
        updateCount(steps);
      } else {
        updateCount(steps - offset);
      };
    } else {
      // Otherwise, draw nothing
      updateCount("-----");
    };
  };

  // Function to trigger if the button is set
  cst.addEventListener("mousedown", (evt) => {
    // cite the held time
    held = Date.now();
    // activate the buttons
    utils.animateElement(csb, "select");
  });

  // Function to trigger if the button is unset
  cst.addEventListener("mouseup", (evt) => {
    // Check if we had a long click
    if ((Date.now() - held) > 1000) {
      // update the offset to the current steps
        offset = -1;
    } else {
      // switch the stepView
      stepView = stepView ? 0 : 1;
      // and store the new stepview counter
      settings.replaceSettings({"stepView":stepView});
    };
    // activate the button
    utils.animateElement(csb, "unselect");
    // and update the step display
    this.draw();
  });
};
