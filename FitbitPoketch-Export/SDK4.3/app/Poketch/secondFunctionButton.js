
// Define any helper functions
import * as utils from "../../common/utils";

// define this module
export let SecondaryButton = function() {
  // variables to hold
  var pressed = 0;
  var secondary = false;

  // if this button is pressed
  this.press = function(secondaryInteract, multiTapTime=500) {
    // if we are using multitap
    if (secondaryInteract == 1) {
      // the secondary function will be enabled if the button is pressed before multitap is exceeded
      secondary = ((Date.now() - pressed) < multiTapTime);
    };
    // log the press time
    pressed = Date.now();
  };

  // if this button is unpressed
  this.unpress = function(secondaryInteract, longPressTime=1000) {
    // if we are using long press
    if (secondaryInteract == 0) {
      // then the secondary function will be enabled if the button is held for long enough
      secondary = ((Date.now() - pressed) > longPressTime);
    };
    // chose which function to do
    if (secondary) {
      secondary = false;
      return false;
    };
    return true;
  };
};
