// Import the fitbit builtins

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

  // Variables to access to check if the calendar has been initialised
  this.init = false;

  // Function to update the time
  this.drawTime = function(now) {
    // Fetch the time elements
    var mon = now.getMonth() + 1;
    var date = now.getDate();
    var day = now.getDay();
    // and the first day of the month
    var fday = new Date(now.getFullYear(), mon - 1, 1).getDay();
    // Fiddle with the month to make it work with the display at the top
    mon = (mon > 10) ? mon+"_" : mon;

    // update the elements
    // Month at the top of screen
    digitHandler.update(mon);

    // Weekday display
    weekSelect.href = "icons/calendar_"+fday+".png";

    // Current day highlight
    daySelect.x = 15 + 31 * day;
    daySelect.y = 12 + 39.5 * ~~((date + fday) / 7);
  };
};
