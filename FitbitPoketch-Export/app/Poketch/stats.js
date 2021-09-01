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
  const stepBar = doc.getElementById("step_bar");
  const distBar = doc.getElementById("dist_bar");
  const calsBar = doc.getElementById("cals_bar");
  const eleBar = doc.getElementById("ele_bar");
  const azmBar = doc.getElementById("azm_bar");

  // text overlay
  const chargeTxt = doc.getElementById("charge_txt");
  const stepTxt = doc.getElementById("step_txt");
  const distTxt = doc.getElementById("dist_txt");
  const calsTxt = doc.getElementById("cals_txt");
  const eleTxt = doc.getElementById("ele_txt");
  const azmTxt = doc.getElementById("azm_txt");

  // Icons
  const chargeIcon = doc.getElementById("charge_icon");
  const stepIcon = doc.getElementById("step_icon");
  const distIcon = doc.getElementById("dist_icon");
  const calsIcon = doc.getElementById("cals_icon");
  const eleIcon = doc.getElementById("ele_icon");
  const azmIcon = doc.getElementById("azm_icon");

  // Function to set the properties correctly
  let setStat = function(bar, txt, value, maxval=100, unit="%", icon=null) {
    bar.width = Math.min(value / maxval, 1) * 78;
    txt.text = value + " " + unit;
    if (icon) { icon.style.display = (value >= maxval) ? "inline" : "none"; };
  };

  // function to draw the steps on screen
  this.draw = function() {
    // Update the battery percentage (as it doesn't need permissions)
    setStat(chargeBar, chargeTxt, battery.chargeLevel);
    // Check we have permissions
    if (me.permissions.granted("access_activity")) {
      setStat(stepBar, stepTxt, today.adjusted.steps, goals.steps, "", stepIcon);
      setStat(distBar, distTxt, today.adjusted.distance, goals.distance, "m", distIcon);
      setStat(calsBar, calsTxt, today.adjusted.calories, goals.calories, "kcal", calsIcon);
      setStat(eleBar,  eleTxt,  today.adjusted.elevationGain, goals.elevationGain, "floors", eleIcon);
      setStat(azmBar,  azmTxt,  today.adjusted.activeZoneMinutes.total, goals.activeZoneMinutes.total, "mins",  azmIcon);
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
