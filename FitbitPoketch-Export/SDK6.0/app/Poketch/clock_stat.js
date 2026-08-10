// Import the fitbit builtins
import { me } from "appbit";
import { battery } from "power";
import { today, goals } from "user-activity";
import { HeartRateSensor } from "heart-rate";

// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let MiniStatsIndicator = function(doc, settings, debug=false) {
  // text overlay
  const statTxt = doc.getElementById("mini_stat_txt");

  // Icons
  const statIconFront = doc.getElementById("mini_stat_front");
  const statIconBack = doc.getElementById("mini_stat_back");

  // whole view
  const statDisplay = doc.getElementById("clock_stat");

  var shownStat = 1;

  // fetch a reference to the heartRateSensor
  let hrm = new HeartRateSensor();

  // Function to set the properties correctly
  let setStat = function(ico, value, unit="%") {
    // if we had a null value, handle it
    if (value == "--") { statTxt.text = "--"; }
    else { statTxt.text = value + " " + unit; };
    statIconBack.href = "icons/icon_"+ico+"_back.png";
    statIconFront.href = "icons/icon_"+ico+"_front.png";
  };

  // function to draw the stats on the screen
  this.draw = function() {
    utils.showElement(statDisplay, shownStat > 1);

    if (shownStat == 3) {
        setStat("power", battery.chargeLevel);
    };

    if ((shownStat == 2) && (me.permissions.granted("access_heart_rate"))) {
        setStat("heart", hrm.heartRate ?? "--", "bpm");
    };

    if (me.permissions.granted("access_activity")) {
        if (shownStat == 4) { setStat("steps", today.adjusted.steps, ""); };
        if (shownStat == 5) { setStat("calories", today.adjusted.calories, "kcal"); };
        if (shownStat == 6) { setStat("distance", today.adjusted.distance, "m"); };
        if (shownStat == 7) { setStat("floor", today.adjusted.elevationGain, "floors"); };
        if (shownStat == 8) { setStat("azm", today.adjusted.activeZoneMinutes.total, "mins"); };
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
    if (shownStat == 2) {
        setStat("heart", hrm.heartRate ?? "--", "bpm")
    };
  });

  //Function to choose which stat to display
  this.switchStat = function(stat) {
    shownStat = stat;
  };
};
