// Import the fitbit builtins
let debug = false;

// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let TimeIndicator = function(doc) {
  // Simple radians to degrees
  const deg2rad = (Math.PI / 180);

  // Fetch the gui elements for the time
  // Digital clock
  let digitHandler = new utils.DigitDisplay(doc, "time_", "0000");

  // Analogue clock
  const minsHand = doc.getElementById("minute_hand");
  const hourHand = doc.getElementsByClassName("hour_hand");

  // Fetch the pikachu sprite
  const backSprite = doc.getElementById("back_sprite");
  const daySprite = doc.getElementById("day_sprite");
  const nightSprite = doc.getElementById("night_sprite");

  // Update the position of an analogue clock hand
  let updateHand = function(ele, angle=0) {
    // Update the Coordinates
    try {
      ele.forEach(function(eles) {
        eles.groupTransform.rotate.angle = (angle + 180) % 360;
      });
    } catch(err) {
      ele.groupTransform.rotate.angle = (angle + 180) % 360;
    };
  };

  // Function to update the time
  this.drawTime = function(now) {
    // Fetch the time elements
    var hour = debug ? 10 : now.getHours();
    var mins = debug ? 10 : now.getMinutes();
    var time = utils.pad(hour)+utils.pad(mins);
    var daytime = (hour >= 10) && (hour < 20);

    // update the time elements
    // Digital time
    digitHandler.update(time);

    // Analogue time
    updateHand(hourHand, (hour%12)*30 + mins*.5);
    updateHand(minsHand, mins * 6);

    // And update the sprite
    utils.showElement(daySprite, daytime);
    utils.showElement(nightSprite, !daytime);
  };
};
