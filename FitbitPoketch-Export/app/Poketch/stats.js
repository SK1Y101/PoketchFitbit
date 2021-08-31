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

  // text overlay
  const chargeTxt = doc.getElementById("charge_txt");
  const distTxt = doc.getElementById("dist_txt");
  const calsTxt = doc.getElementById("cals_txt");
  const eleTxt = doc.getElementById("ele_txt");
  const azmTxt = doc.getElementById("azm_txt");

  // Icons
  /*const chargeIcon = doc.getElementsByClassName("charge_icon");
  const distIcon = doc.getElementsByClassName("dist_icon");
  const calsIcon = doc.getElementsByClassName("cals_icon");
  const eleIcon = doc.getElementsByClassName("ele_icon");
  const azmIcon = doc.getElementsByClassName("azm_icon");
  */

  // Function to set the properties correctly
  let setStat = function(bar, txt, value, maxval, unit="", text="") {
    bar.width = 78 * Math.min(1, value / maxval);
    txt.text = value + " " + unit;
  };

  // function to draw the steps on screen
  this.draw = function() {
    // Update the battery percentage (as it doesn't need permissions)
    setStat(chargeBar, chargeTxt, battery.chargeLevel, 100, "%");
    // Check we have permissions
    if (me.permissions.granted("access_activity")) {
      setStat(distBar, distTxt, today.adjusted.distance, goals.distance, "m");
      setStat(calsBar, calsTxt, today.adjusted.calories, goals.calories, "kcal");
      setStat(eleBar,  eleTxt,  today.adjusted.elevationGain, goals.elevationGain, "floors");
      setStat(azmBar,  azmTxt,  today.adjusted.activeZoneMinutes.total, goals.activeZoneMinutes.total, "mins");
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
