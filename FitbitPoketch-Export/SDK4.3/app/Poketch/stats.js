// Import the fitbit builtins
import { me } from "appbit";
import { battery } from "power";
import { user } from "user-profile";
import { today, goals } from "user-activity";

// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let StatsIndicator = function(doc) {
  // Fetch ui Elements
  // percentage bars
  const chargeBar = doc.getElementById("charge_bar");
  //const heartBar = doc.getElementById("heart_bar");
  const distBar = doc.getElementById("dist_bar");
  const calsBar = doc.getElementById("cals_bar");
  const eleBar = doc.getElementById("ele_bar");
  const azmBar = doc.getElementById("azm_bar");

  // text overlay
  const chargeTxt = doc.getElementById("charge_txt");
  //const heartTxt = doc.getElementById("heart_txt");
  const distTxt = doc.getElementById("dist_txt");
  const calsTxt = doc.getElementById("cals_txt");
  const eleTxt = doc.getElementById("ele_txt");
  const azmTxt = doc.getElementById("azm_txt");

  // Icons
  const chargeIcon = doc.getElementById("charge_icon");
  //const heartIcon = doc.getElementById("heart_icon");
  const distIcon = doc.getElementById("dist_icon");
  const calsIcon = doc.getElementById("cals_icon");
  const eleIcon = doc.getElementById("ele_icon");
  const azmIcon = doc.getElementById("azm_icon");

  // Maximum heart rate, from the formula (211 - age*.64), else just 220
  //const maxHr = me.persmissions.granted("access_user_profile") ? Math.round(211 - user.age*.64) : 220;

  // update the heart rate monitor
  // check for permissions first
  //if (HeartRateSensor && me.permissions.granted("access_heart_rate")) {
  //  // update on a new reading
  //  hrm.onreading = function() {
  //    // set the stats bar
  //    setStat(heartBar, heartTxt, hrm.heartRate, maxHr, "bpm");
  //  };
  //} else {
  //  // provide a null value
  //  setStat(heartBar, heartTxt, "--", maxHr, "bpm");
  //};

  // Function to set the properties correctly
  let setStat = function(bar, txt, value, maxval=100, unit="%", icon=null) {
    txt.text = value + " " + unit;
    // if the value is invalid, set to zero
    (value == "--") ? value = 0 : value;
    bar.width = Math.min(value / maxval, 1) * 78;
    if (icon) { icon.style.display = (value >= maxval) ? "inline" : "none"; };
  };

  // function to draw the stats on the screen
  this.draw = function() {
    // Update the battery percentage (as it doesn't need permissions)
    setStat(chargeBar, chargeTxt, battery.chargeLevel);
    // Check we have permissions
    if (me.permissions.granted("access_activity")) {
      setStat(distBar, distTxt, today.adjusted.distance, goals.distance, "m", distIcon);
      setStat(calsBar, calsTxt, today.adjusted.calories, goals.calories, "kcal", calsIcon);
      setStat(eleBar,  eleTxt,  today.adjusted.elevationGain, goals.elevationGain, "floors", eleIcon);
      setStat(azmBar,  azmTxt,  today.adjusted.activeZoneMinutes.total, goals.activeZoneMinutes.total, "mins",  azmIcon);
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
