// Import the fitbit builtins

// Define any helper functions
// Animate an element
let animateElement = function(ele, trigger) {
  ele.forEach(function(eles) {
    eles.animate(trigger);
  });
};

// Define this module
export let SwitchView = function(doc) {
  // Fetch the elements that detect a click
  const foreBut = doc.getElementById("fore_button");
  const backBut = doc.getElementById("back_button");

  //Fetch the ui buttons to animate
  const upBut = doc.getElementsByClassName("button_top");
  const downBut = doc.getElementsByClassName("button_bottom");

  // Fetch the view changing screen thingy
  const view = doc.getElementsByClassName("view_change");

  // Variable to store if the screen is updating
  var updating = false;

  // Create event listeners

  // foreward button pressed
  foreBut.addEventListener("mousedown", (evt) => {
    // Ensure we can animate
    if (!updating) {
      // start the animations
      animateElement(downBut, "mousedown");
    };
  });

  // forward button pressed
  backBut.addEventListener("mousedown", (evt) => {
    // Ensure we can animate
    if (!updating) {
      // start the animations
      animateElement(upBut, "mousedown");
    };
  });

  // forward button is released
  foreBut.addEventListener("mouseup", (evt) => {
    // Ensure we can animate
    if (!updating) {
      // start the animations
      animateElement(view, "enable");
      animateElement(downBut, "mouseup");
      // And force the ui to stop until the animations are done
      updating = true;
      setTimeout(function() { updating = false; }, 550 + 250);
    };
  });

  // forward button is released
  backBut.addEventListener("mouseup", (evt) => {
    // Ensure we can animate
    if (!updating) {
      // start the animations
      animateElement(view, "enable");
      animateElement(upBut, "mouseup");
      // And force the ui to stop until the animations are done
      updating = true;
      setTimeout(function() { updating = false; }, 550 + 250);
    };
  });
};
