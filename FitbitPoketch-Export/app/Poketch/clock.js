// Import the fitbit builtins

// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let TimeIndicator = function(doc) {
  // Simple radians to degrees
  const deg2rad = (Math.PI / 180);

  // Fetch the gui elements for the time
  // Digital clock
  const hourTen = doc.getElementById("hour_ten");
  const hourOne = doc.getElementById("hour_one");
  const minsTen = doc.getElementById("min_ten");
  const minsOne = doc.getElementById("min_one");

  // Analogue clock
  const minsHand = doc.getElementById("minute_hand");
  const hourHand = doc.getElementById("hour_hand");
  const hourHandBack = doc.getElementById("hour_hand_back");

  // Fetch the pikachu sprite
  const daySprite = doc.getElementsByClassName("day");
  const nightSprite = doc.getElementsByClassName("night");

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
    var hour = now.getHours();
    var hourT = utils.pad(hour);
    var mins = now.getMinutes();
    var minsT = utils.pad(mins);
    var daytime = (hour >= 10) && (hour < 20);

    // update the time elements
    // Digital time
    utils.showDigit(hourTen, hourT[0]);
    utils.showDigit(hourOne, hourT[1]);
    utils.showDigit(minsTen, minsT[0]);
    utils.showDigit(minsOne, minsT[1]);

    // Analogue time
    updateHand(hourHand, (hour%12)*30 + mins*.5);
    updateHand(hourHandBack, (hour%12)*30 + mins*.5);
    updateHand(minsHand, mins * 6);

    // And update the sprite
    utils.showElement(daySprite, daytime);
    utils.showElement(nightSprite, !daytime);
  };
};
