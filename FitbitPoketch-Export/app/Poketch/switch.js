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
  const downBbut = doc.getElementsByClassName("button_bottom");

  // Fetch the view changing screen thingy
  const view = doc.getElementsByClassName("view_change");

  // Create event listeners
  // foreward button pressed
  foreBut.addEventListener("mousedown", (evt) => {
    animateElement(downBut, "mousedown");
  });
  // forward button is released
  foreBut.addEventListener("mouseup", (evt) => {
    animateElement(view, "enable");
    animateElement(downBut, "mouseup");
  });
  // forward button pressed
  backBut.addEventListener("mousedown", (evt) => {
    animateElement(upBut, "mousedown");
  });
  // forward button is released
  backBut.addEventListener("mouseup", (evt) => {
    animateElement(view, "enable");
    animateElement(upBut, "mouseup");
  });
};
