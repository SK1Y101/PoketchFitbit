// Import the fitbit builtins
import { me } from "appbit";
import { battery } from "power";
import { today, goals } from "user-activity";

// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let StatsIndicator = function(doc, settings) {
  // Fetch ui Elements
  // percentage bars
  const chargeBar = doc.getElementById("charge_bar");
  const distBar = doc.getElementById("dist_bar");
  const calsBar = doc.getElementById("cals_bar");
  const eleBar = doc.getElementById("ele_bar");
  const azmBar = doc.getElementById("azm_bar");

  //text overlay
  const chargeTxt = doc.getElementById("charge_txt");
  const distTxt = doc.getElementById("dist_txt");
  const calsTxt = doc.getElementById("cals_txt");
  const eleTxt = doc.getElementById("ele_txt");
  const azmTxt = doc.getElementById("azm_txt");

  // function to draw the steps on screen
  this.draw = function() {
    // Update the battery percentage (as it doesn't need permissions)
    chargeBar.width = .78 * Math.floor(battery.chargeLevel);
    chargeTxt.text = battery.chargeLevel + " / " + 100;
    // Check we have permissions
    if (me.permissions.granted("access_activity")) {
      distBar.width = 78 * Math.min(1, today.adjusted.distance / goals.distance);
      distTxt.text = today.adjusted.distance + " / " + goals.distance;
      calsBar.width = 78 * Math.min(1, today.adjusted.calories / goals.calories);
      calsTxt.text = today.adjusted.calories + " / " + goals.calories;
      eleBar.width = 78 * Math.min(1, today.adjusted.elevationGain / goals.elevationGain);
      eleTxt.text = today.adjusted.elevationGain + " / " + goals.elevationGain;
      azmBar.width = 78 * Math.min(1, today.adjusted.activeZoneMinutes.total / goals.activeZoneMinutes.total);
      azmTxt.text = today.adjusted.activeZoneMinutes.total + " / " + goals.activeZoneMinutes.total;
    } else {
      // Otherwise
    };
  };
};

// Planning

// Watch charge
// Heart rate?
// Distance traveled
// Calories
// Elevation gain
// AZM?
