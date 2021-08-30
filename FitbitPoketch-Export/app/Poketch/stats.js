// Import the fitbit builtins
import { me } from "appbit";
import * as activity from "user-activity";

// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let StatsIndicator = function(doc, settings) {
  // function to draw the steps on screen
  this.draw = function() {
    // Check we have permissions
    if (me.permissions.granted("access_activity")) {
      // Fetch the number of steps
      var steps = activity.today.adjusted.steps;
      // update the offset on long press
      if ((offset == -1) || (offset > steps))   { newOffset(steps); };
      // And show the desired step counter
      if (stepView == 0) {
        digitHandler.update(steps);
      } else {
        digitHandler.update(steps - offset);
      };
    } else {
      // Otherwise, draw nothing
      digitHandler.update("-----");
    };
  };
};
