// Import the fitbit builtins

// Define any helper functions
// Animate an element
let animateElement = function(ele, trigger) {
  ele.forEach(function(eles) {
    eles.animate(trigger);
  });
};

// Define this module
export let SwitchView = function(doc, settings) {
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

  // Store the view information
  var views = {};
  var vnum = 0;
  var vlen = 0;

  // Function to fetch the available views
  let fetchViews = function() {
    do {
      // fetch the next view
      views[vnum] = doc.getElementById("view"+vnum);
      ++vnum;
      ++vlen;
    } while (doc.getElementById("view"+vnum) != null);
    // Load the view number from settings, or use the clock ace by default
    vnum = settings.getOrElse("viewnum", 0);
    console.log("the current view is "+vnum);
  };

  // Function to switch to the next view
  let changeView = function(inc=0, forceUpdate=false) {
    // compute the new view to change to
    var vnew = (vnum + inc + vlen) % vlen;
    // If it is different to the current one, or we are forcing an update
    if ((vnew != vnum) || (forceUpdate)) {
      // change the display visibility of the elements
      views[vnum].style.display = "none";
      views[vnew].style.display = "inline";
      // And update the view number
      vnum = (vnum + inc + vlen) % vlen;
    };
    // Update the view settins
    settings.replaceSettings({"viewnum":vnum});
    console.log("the new view is "+vnum);
  };

  // fetch all of the views
  fetchViews();
  // And update them initially
  changeView(0, true);

  // Create event listeners
  let buttonEvent = function(button, inc=0) {
    // Ensure we can animate
    if (!updating) {
      // start the animations
      animateElement(view, "enable");
      animateElement(button, "click");
      // force the ui to stop until the animations are done
      updating = true;
      // wait until the view is greyed out
      setTimeout(function() {
        //change the view
        changeView(inc);
        // and set a timout to open the display again
        setTimeout(function() { updating = false; }, 400);
      }, 400 );
    };
  };

  // forward button is released
  foreBut.addEventListener("mousedown", (evt) => {
    //activate the buttons
    buttonEvent(downBut, 1);
  });

  // forward button is released
  backBut.addEventListener("mousedown", (evt) => {
    //activate the buttons
    buttonEvent(upBut, 1);
  });
};
