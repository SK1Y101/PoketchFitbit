// Import the fitbit builtins

// Define any helper functions
// Change a digit display
function showDigit(ele, digit) {
  try {
    ele.href = "icons/digit_" + digit + ".png";
  } catch(err) {
    console.log(err + ": Couldn't assign digit '" + digit + "'")
  };
};

// Pad a value such that it has a defined length
function pad(val, def="00") {
  return (def + val.toString()).slice(-def.length);
};

// Define this module
export let TimeIndicator = function(doc) {
  // Fetch the gui elements for the time
  const hourTen = doc.getElementById("hour_ten");
  const hourOne = doc.getElementById("hour_one");
  const minsTen = doc.getElementById("min_ten");
  const minsOne = doc.getElementById("min_one");


  // Function to update the time
  this.drawTime = function(now) {
    // Fetch the time elements
    var hour = pad(now.getHours());
    var mins = pad(now.getMinutes());

    // And update the parts that need it
    console.log(now.getMonth().toString())
    showDigit(hourTen, hour[0]);
    showDigit(hourOne, hour[1]);
    showDigit(minsTen, mins[0]);
    showDigit(minsOne, mins[1]);
  };
};
