// Import the included fitbit modules
import clock from "clock";
import { memory } from "system";
import document from "document";
import { display } from "display";
import { me as device } from "device";
import { me as appbit } from "appbit";
import { peerSocket } from "messaging";

// Import the modules I have written
import * as utils from "../common/utils";
import { Settings } from "../common/settings";
import { SwitchView } from "./Poketch/switch";
import { StepCounter } from "./Poketch/steps";
import { TimeIndicator } from "./Poketch/clock";
import { CountCounter } from "./Poketch/counter";
import { CalendarView } from "./Poketch/calendar";
import { StatsIndicator} from "./Poketch/stats";

// Log the memory usage once the entire program is loaded
console.log("Device JS memory at import: " + memory.js.used + "/" + memory.js.total);

// Set the default values of all options
let DefSet = function() {
  var defaults = {
    // Visual settings
    skin: 0,
    edgeColour: "#3050F8",
    faceColour: "#303030",
    screenColour: "#70B070",
    // switch view
    viewnum: 0,
    // Pedometer
    stepView: 0,
    stepView: 0,
    // counter
    counterValue: 0,
  };
  return defaults;
};

// And fetch a reference to the modules
let settings = new Settings("settings.cbor", DefSet);
let timeInd = new TimeIndicator(document);
let statsInd = new StatsIndicator(document);
let stepCounter = new StepCounter(document, settings);
let calendarView = new CalendarView(document, settings);
let countCounter = new CountCounter(document, settings);

// Log the memory usage once the entire program is loaded
console.log("Device JS memory at modules: " + memory.js.used + "/" + memory.js.total);

// Define the functions that should be ran on a view update
var viewUpdate = {
  "1": stepCounter.draw,
  "2": statsInd.draw,
};

// define the switch viewer, passing any updates needed
let switchView = new SwitchView(document, settings, viewUpdate);

// Define the clock tick rate
clock.granularity = "minutes"; // seconds, minutes, hours

// fetch elementss
const bg = document.getElementById("background");
const fc = document.getElementsByClassName("face_colour");
const sc = document.getElementsByClassName("screen_colour");
const dpskin = document.getElementsByClassName("dp_skin");
const ptskin = document.getElementsByClassName("pt_skin");
const face = document.getElementById("screen");

// Update elements once a minute
clock.addEventListener("tick", (evt) => {
  // Fetch the current time
  let now = evt.date;
  // Update the watch
  timeInd.drawTime(now);
  // And ensure we initialise the calendar
  if (!calendarView.init) {
    calendarView.drawTime(now);
    calendarView.init = true;
  };
  // If we reach midnight
  if (!(now.getMinutes() || now.getHours())) {
    // Then call any reset functions
    stepCounter.reset();
    // And update the calendar at the end of the day
    calendarView.drawTime(now);
  };
});

// Update elements when the display is turned on
display.addEventListener("change", () => {
  if (display.on) {
    // start sensors
    switchView.draw();
  } else {
    // stop sensors
  };
});

// Change the colour
let updateColour = function(colour, ele) {
  try {
    ele.forEach(function(eles) {
      eles.style.fill = colour;
    });
  } catch(err) {
    ele.style.fill=colour;
  };
}

// Change the skin
let updateSkin = function(skinType) {
  // Hide all the skins
  utils.showElement(ptskin, skinType==1);
  utils.showElement(dpskin, skinType==0);
  // Update the size of the screen
  face.groupTransform.translate.x = -Math.ceil((skinType==2 ? 0.035 * device.screen.width: 0));
  face.groupTransform.translate.y = -Math.ceil((skinType==2 ? 0.03 * device.screen.height: 0));
  face.groupTransform.scale.x = (skinType==2 ? 100 / 81.5: 1);
  face.groupTransform.scale.y = (skinType==2 ? 100 / 93.5: 1);
}

// Define a function to apply our settings
let applySettings = function() {
  if (! settings) {
    return;
  };
  try {
    // Set element colours
    settings.isPresent("skin", updateSkin);
    settings.isPresent("edgeColour", updateColour, bg);
    settings.isPresent("faceColour", updateColour, fc);
    settings.isPresent("screenColour", updateColour, sc);
    // Show that settings have been loaded
    console.log("Settings applied");
  } catch (err) {
    console.log("Couldn't apply settings");
  };
}
applySettings();

//Fetch any messages that come through
peerSocket.addEventListener("message", function(evt) {
  if (!evt.data.hasOwnProperty("type")) {
    console.log("Message without a type received: " + evt.data)
  };
  if (evt.data.type === "settings") {
    let newSet = {};
    newSet[evt.data.key] = evt.data.value;

    console.log("Setting changed: "+evt.data.key+evt.data.value);

    settings.replaceSettings(newSet);
    applySettings();
  };
});

//Save our settings if the watch is unloaded
appbit.addEventListener("unload", function() {
  settings.saveSettings();
});

// Log the memory usage once the entire program is loaded
console.log("Device JS memory: " + memory.js.used + "/" + memory.js.total);
