// Import the fitbit builtins

// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let KitchenTimer = function(doc) {

  // Fetch the digit handler
  let digitHandler = new utils.DigitDisplay(timer, "count_", "0000");

  // function to draw the display
  this.draw = function() {
  };
};
