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
    vnum=0;
  };

  // Function to switch to the next view
  let changeView = function(inc=0) {
    // compute the new view to change to
    var vnew = (vnum + inc + vlen) % vlen;
    console.log("new view: "+vnew, "old view: "+vnum);
    // If it is different to the current one
    if (vnew != vnum) {
      // change the display visibility of the elements
      views[vnum].style.display = "none";
      views[vnew].style.display = "inline";
      // And update the view number
      vnum = (vnum + inc + vlen) % vlen;
    };
    console.log("vnum is now:"+vnum);
  };

  // And fetch all of the views
  fetchViews();

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
      // force the ui to stop until the animations are done
      updating = true;
      // wait until the view is greyed out
      setTimeout(function() {
        //change the view
        changeView(1);
        // and set a timout to open the display again
        setTimeout(function() { updating = false; }, 400);
      }, 400 );
    };
  });

  // forward button is released
  backBut.addEventListener("mouseup", (evt) => {
    // Ensure we can animate
    if (!updating) {
      // start the animations
      animateElement(view, "enable");
      animateElement(upBut, "mouseup");
      // force the ui to stop until the animations are done
      updating = true;
      // wait until the view is greyed out
      setTimeout(function() {
        //change the view
        changeView(-1);
        // and set a timout to open the display again
        setTimeout(function() { updating = false; }, 400);
      }, 400 );
    };
  });
};
