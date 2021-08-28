// Import the fitbit builtins
import { me } from "appbit";
import * as activity from "user-activity";

// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let StepCounter = function(doc) {
  // Fetch the elements that correspond to the counter
  const one = doc.getElementsByClassName("step_one");
  const ten = doc.getElementsByClassName("step_ten");
  const hun = doc.getElementsByClassName("step_hun");
  const tho = doc.getElementsByClassName("step_tho");
  const tth = doc.getElementsByClassName("step_tth");

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

  // function to draw the steps on screen
  this.draw = function() {
    // Check we have permissions
    if (me.permissions.granted("access_activity")) {
     updateCount(activity.today.adjusted.steps);
    } else {
      updateCount("-----");
    };
  };
};
