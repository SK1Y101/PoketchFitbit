// Import the fitbit builtins
import { preferences } from "user-settings";

// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let CalendarView = function(doc, settings) {
  // Fetch the gui elements for the calendar
  // Month number
  const digitHandler = new utils.DigitDisplay(doc, "calendar_", "___");

  // Day highlighter
  const daySelect = doc.getElementById("calendar_day");
  // Month mover
  const weekSelect = doc.getElementById("calendar_week");
  // Week start shower
  const monStart = doc.getElementById("monday_start");
  const sunStart = doc.getElementById("sunday_start");
  // day obscurers
  const botObs = doc.getElementById("calendar_bot_obs");
  const endObs = doc.getElementById("calendar_end_obs");

  // Variables to access to check if the calendar has been initialised
  this.init = false;

  // Function to return the coordinates of a day given a month
  let dayCoor = function(year, mon, date, fy, fdw=0) {
    // fetch the day
    var dy = new Date(year, mon - 1, date).getDay()
    dy = (dy - fdw + 7) % 7;
    // compute x and y
    const x = 15 + 31 * dy;
    // offset the y by .1, as the saturday is sometimes misrepresented
    const y = 12 + 39.5 * ~~((date + fy - fdw - .1) / 7);
    // return
    return [x, y];
  };

  // Function to update the time
  this.drawTime = function(now) {
    now = Date.now();
    // Fetch the time elements
    var year = now.getFullYear();
    var mon = now.getMonth() + 1;
    var date = now.getDate();
    // fetch the first day of the week (user preference)
    var fwd = settings.getOrElse("fwd", 0);
    // fetch the first day of the month
    var fdy = (new Date(year, mon - 1, 1).getDay() - fwd + 7) % 7;
    // Fetch the length of the month
    var lmon = new Date(year, mon, 0).getDate();
    // And offset all of the days by the user prefered weekday begining

    // update the elements
    // Month at the top of screen
    digitHandler.update((mon > 10) ? mon+"_" : mon);
    utils.showElement(monStart, fwd);
    utils.showElement(sunStart, !fwd);

    // Weekday display
    weekSelect.href = "icons/calendar_"+fdy+".png";

    // Current day highlight
    var hcor = dayCoor(year, mon, date, fdy, fwd);//dayCoor(year, mon, date, fdy, fwd);
    daySelect.x = hcor[0]; daySelect.y = hcor[1];

    // And any required day obscuration
    if (lmon < 31) {
      // obscure the day after last
      var ldy = dayCoor(year, mon, lmon+1, fdy, fwd);
      endObs.x = ldy[0]; endObs.y = ldy[1];
      // if february
      if (lmon < 30) {
        // fetch the coordinates of 30 and 31
        var te = dayCoor(year, mon, 30, fdy, fwd);
        var to = dayCoor(year, mon, 31, fdy, fwd);
        // and figure out if the bottom row needs to be obscured
        botObs.x = Math.min(te[0], to[0]);
        botObs.y = Math.max(te[1], to[1]);
      };
    };
  };
};
