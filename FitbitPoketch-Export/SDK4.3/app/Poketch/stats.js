// Import the fitbit builtins
import { me } from "appbit";
import { battery } from "power";
import { user } from "user-profile";
import { today, goals } from "user-activity";
import { HeartRateSensor } from "heart-rate";

// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let StatsIndicator = function(doc, settings, debug=false) {
  // Fetch ui Elements
  // percentage bars
  const chargeBar = doc.getElementById("charge_bar");
  const heartBar = doc.getElementById("heart_bar");
  const distBar = doc.getElementById("dist_bar");
  const calsBar = doc.getElementById("cals_bar");
  const eleBar = doc.getElementById("ele_bar");
  const azmBar = doc.getElementById("azm_bar");

  // text overlay
  const chargeTxt = doc.getElementById("charge_txt");
  const heartTxt = doc.getElementById("heart_txt");
  const distTxt = doc.getElementById("dist_txt");
  const calsTxt = doc.getElementById("cals_txt");
  const eleTxt = doc.getElementById("ele_txt");
  const azmTxt = doc.getElementById("azm_txt");
  if (debug) { heartTxt.text = 83; }

  // Icons
  const distIcon = doc.getElementById("dist_icon");
  const calsIcon = doc.getElementById("cals_icon");
  const eleIcon = doc.getElementById("ele_icon");
  const azmIcon = doc.getElementById("azm_icon");

  // Maximum heart rate, from the formula (211 - age*.64), else just 220
  let maxHr = 220;
  if (me.permissions.granted("access_user_profile")) { maxHr = Math.round(211 - user.age * .64); };

  // fetch a reference to the heartRateSensor
  let hrm = new HeartRateSensor();

  // Function to set the properties correctly
  let setStat = function(bar, txt, value, maxval=100, unit="%", icon=null) {
    // if we had a null value, handle it
    if (value == "--") { txt.text = "--"; value = maxval; }
    else { txt.text = value + " " + unit; };
    // draw the rest of the ui bits
    bar.width = Math.min(value / maxval, 1) * 78;
    if (icon) {icon.style.display = (value >= maxval) ? "inline" : "none"};
  };

  // function to draw the stats on the screen
  this.draw = function() {
    // Update the battery percentage (as it doesn't need permissions)
    setStat(chargeBar, chargeTxt, battery.chargeLevel);
    // Check we have permissions
    if (me.permissions.granted("access_activity")) {
      setStat(distBar, distTxt, debug ? 7341 : today.adjusted.distance, goals.distance, "m", distIcon);
      setStat(calsBar, calsTxt, debug ? 2073 : today.adjusted.calories, goals.calories, "kcal", calsIcon);
      setStat(eleBar,  eleTxt,  debug ? 24   : today.adjusted.elevationGain, goals.elevationGain, "floors", eleIcon);
      setStat(azmBar,  azmTxt,  debug ? 14   : today.adjusted.activeZoneMinutes.total, goals.activeZoneMinutes.total, "mins",  azmIcon);
    };
    if (me.permissions.granted("access_heart_rate")) {
      setStat(heartBar, heartTxt, debug ? 83 : (hrm.heartRate ?? "--"), maxHr, "bpm");
    };
  };

  // function to start the heartrate monitor
  this.start = function() {
    if (me.permissions.granted("access_heart_rate")) {
      hrm.start();
    };
  };

  // function to stop the heartrate monitor
  this.stop = function() {
    hrm.stop();
  };

  // function to fetch a heartrate reading
  hrm.addEventListener("reading", () => {
    // update the display
    setStat(heartBar, heartTxt, hrm.heartRate ?? "--", maxHr, "bpm");
  });
};

// Planning

// Watch charge
// Heart rate?
// Distance traveled
// Calories
// Elevation gain
// AZM?
