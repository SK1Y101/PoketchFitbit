// Import the fitbit builtins

// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let SwitchView = function(doc, settings, viewUpdate, debug=false) {
  // Fetch the elements that detect a click
  const foreBut = doc.getElementById("fore_button");
  const backBut = doc.getElementById("back_button");
  // Move the elements to layer 100, so that we can stack other buttons on top of them
  utils.changeLayer(foreBut, 100);
  utils.changeLayer(backBut, 100);

  //Fetch the ui buttons to animate
  const upBut = doc.getElementsByClassName("button_top");
  const downBut = doc.getElementsByClassName("button_bottom");

  // Fetch the view changing screen thingy
  const view = doc.getElementsByClassName("view_change");

  // Variable to store if the screen is updating
  var updating = false;

  // Store the view information
  var views = {};
  var apps = [];
  var vnum = 0;
  var vlen = 0;

  // Update any views that need it
  let drawView = function() {
    var vu = viewUpdate[vnum];
    if (vu) {
      vu()
    };
  };

  // Function to fetch the allowed applications
  let fetchApps = function(newApps) {
    apps = [0].concat(newApps)
  };

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
  };

  // Function to compute the next available application
  let fetchNextApp = function(inc = 0) {
    // If we are not changing apps
    if (inc == 0) {
      // return the current app
      return vnum;
    } else {
      // define our temporary increment
      var i = 0;
      // execute at least once
      do {
        // increment i by our increment
        i = i + inc;
        // keep looping if the selected app is not in our list of allowed apps
      } while (apps.indexOf((vnum + i + vlen) % vlen) == -1);
      // and return the next allowed one
      return (vnum + i + vlen) % vlen
    };
  };

  // Function to switch to the next view
  let changeView = function(inc=0, forceUpdate=false) {
    // compute the new view to change to, ensuring it is within our allowed application
    var vnew = fetchNextApp(inc);
    // If it is different to the current one, or we are forcing an update
    if ((vnew != vnum) || (forceUpdate)) {
      // change the display visibility of the elements
      views[vnum].style.display = "none";
      views[vnew].style.display = "inline";
      // And update the view number
      vnum = fetchNextApp(inc);
      drawView();
    };
    // Update the view settins
    settings.replaceSettings({"viewnum":vnum});
  };

  // fetch all of the views
  fetchViews();
  fetchApps();
  // And update them initially
  changeView(0, true);

  // Create event listeners
  let buttonEvent = function(button, inc=0) {
    // Ensure we can animate
    if (!updating) {
      // start the animations
      utils.animateElement(view, "enable");
      utils.animateElement(button, "click");
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
    // activate the buttons
    buttonEvent(downBut, 1);
  });

  // forward button is released
  backBut.addEventListener("mousedown", (evt) => {
    // activate the buttons
    buttonEvent(upBut, -1);
  });

  this.draw = function() {
    drawView();
  };

  this.appSettings = function(newtabs) {
    fetchApps(newtabs);
  };
};
