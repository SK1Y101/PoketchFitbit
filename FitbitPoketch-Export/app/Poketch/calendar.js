// Import the fitbit builtins

// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let CalendarView = function(doc) {
  // Fetch the gui elements for the calendar
  // Digital clock
  let digitHandler = new utils.DigitDisplay(doc, "calendar_", "___");

  // Function to update the time
  this.drawTime = function(now) {
    // Fetch the time elements
    var mon = now.getMonth() + 1;
    mon = (mon > 10) ? mon+"_" : mon;

    // update the elements
    // Month at the top of screen
    digitHandler.update(mon);
  };
};
