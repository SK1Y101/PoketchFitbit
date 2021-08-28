// Import the fitbit builtins

// Define any helper functions
// Change a digit display
function showDigit(ele, digit) {
  try {
    ele.href = "digits/digit_" + digit + ".png";
  } catch(err) {
    console.log(err + ": Couldn't assign digit '" + digit + "'")
  };
};

// Hide a set of gui elemetns
function showElement(ele, val) {
  try {
    ele.forEach(function(eles) {
      eles.style.display = (val ? "inline" : "none");
    });
  } catch(err) {
    ele.style.display = (val ? "inline" : "none");
  };
};

// Pad a value such that it has a defined length
function pad(val, def="00") {
  return (def + val.toString()).slice(-def.length);
};

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
    var hourT = pad(hour);
    var mins = now.getMinutes();
    var minsT = pad(mins);
    var daytime = (hour >= 10) && (hour < 20);

    // update the time elements
    // Digital time
    showDigit(hourTen, hourT[0]);
    showDigit(hourOne, hourT[1]);
    showDigit(minsTen, minsT[0]);
    showDigit(minsOne, minsT[1]);

    // Analogue time
    updateHand(hourHand, (hour%12)*30 + mins*.5);
    updateHand(hourHandBack, (hour%12)*30 + mins*.5);
    updateHand(minsHand, mins * 6);

    // And update the sprite
    showElement(daySprite, daytime);
    showElement(nightSprite, !daytime);
  };
};
