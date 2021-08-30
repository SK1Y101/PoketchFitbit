// Import the fitbit builtins
import { preferences } from "user-settings";

// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let CalendarView = function(doc) {
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

  // Function to update the time
  this.drawTime = function(now) {
    // Fetch the time elements
    var mon = 10;//now.getMonth() + 1;
    var date = 26;//now.getDate();
    var day = 2;//now.getDay();
    // fetch the first day of the week (user preference)
    var fdw = preferences.firstDayOfWeek;
    // and the first day of the month
    var fday = new Date(now.getFullYear(), mon - 1, 1).getDay();
    // Fiddle with the month to make it work with the display at the top
    mon = (mon > 10) ? mon+"_" : mon;
    // And offset all of the days by the user prefered weekday begining
    day = ((day - fdw + 7)%7); fday = ((fday - fdw + 7)%7)

    // update the elements
    // Month at the top of screen
    digitHandler.update(mon);
    utils.showElement(monStart, fdw);
    utils.showElement(sunStart, !fdw);

    // Weekday display
    weekSelect.href = "icons/calendar_"+fday+".png";

    // Current day highlight
    daySelect.x = 15 + 31 * day;
    daySelect.y = 12 + 39.5 * ~~((date + fday) / 7);
  };
};
