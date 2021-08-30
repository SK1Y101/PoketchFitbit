// Import the fitbit builtins
import { me } from "appbit";
import { battery } from "power";
import * as activity from "user-activity";

// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let StatsIndicator = function(doc, settings) {
  // Fetch ui Elements
  const chargeBar = doc.getElementById("charge_bar");

  // function to draw the steps on screen
  this.draw = function() {
    chargeBar.width = .82 * Math.floor(battery.chargeLevel);
    // Check we have permissions
    if (me.permissions.granted("access_activity")) {
      // Fetch the number of steps
      var steps = activity.today.adjusted.steps;
      // And show the desired step counter
    } else {
      // Otherwise
    };
  };
};

// Planning

// Watch charge
// Heart rate?
// Distance traveled
// AZM?
