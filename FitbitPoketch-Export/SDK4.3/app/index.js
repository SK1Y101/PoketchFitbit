// Import the included fitbit modules
import clock from "clock";
import { memory } from "system";
import document from "document";
import { display } from "display";
import { me as device } from "device";
import { me as appbit } from "appbit";
import { peerSocket } from "messaging";
//import { HeartRateSensor } from "heart-rate";

// Import the modules I have written
import * as utils from "../common/utils";
import { Settings } from "../common/settings";
import { TypeCalc } from "./Poketch/typecalc";
import { SwitchView } from "./Poketch/switch";
import { StepCounter } from "./Poketch/steps";
import { KitchenTimer } from "./Poketch/timer";
import { TimeIndicator } from "./Poketch/clock";
import { CountCounter } from "./Poketch/counter";
import { StatsIndicator } from "./Poketch/stats";
import { CalendarView } from "./Poketch/calendar";

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
    mascotSprite: 0,
    // switch view
    viewnum: 0,
    activeApps: [1],
    // Pedometer
    stepView: 0,
    // counter
    counterValue: 0,
    // secondInteract
    secondInteract: 0,
    longPressTime: 1000,
    multiTapTime: 500,
  };
  return defaults;
};

// Splice function
String.prototype.splice = function(start, end, replacement) {
  return this.substr(0, start) + replacement + this.substr(end);
}

const debug = false;

// And fetch a reference to the modules
let settings = new Settings("settings.cbor", DefSet);
let timeInd = new TimeIndicator(document, settings, debug);
let statsInd = new StatsIndicator(document, debug);
let moveCalc = new TypeCalc(document, settings, debug);
let stepCounter = new StepCounter(document, settings, debug);
let kitchenTimer = new KitchenTimer(document, debug);
let calendarView = new CalendarView(document, settings, debug);
let countCounter = new CountCounter(document, settings, debug);

// Log the memory usage once the entire program is loaded
console.log("Device JS memory at modules: " + memory.js.used + "/" + memory.js.total);

// Define the functions that should be ran on a view update
var viewUpdate = {
  "1": stepCounter.draw,
  "2": statsInd.draw,
};

// define the switch viewer, passing any updates needed
let switchView = new SwitchView(document, settings, viewUpdate, debug);

// Define the clock tick rate
clock.granularity = "minutes"; // seconds, minutes, hours

// fetch elementss
const bg = document.getElementById("background");
const fc = document.getElementsByClassName("face_colour");
const sc = document.getElementsByClassName("screen_colour");
const dpskin = document.getElementsByClassName("dp_skin");
const ptskin = document.getElementsByClassName("pt_skin");
const bdspskin = document.getElementsByClassName("bdsp_skin");
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
  // Update once an hour
  if (!now.getMinutes()) {
    // And update the calendar at the end of the day
    calendarView.drawTime(now);
    // Update once a day
    if (!now.getHours()) {
      // Call any reset functions
      stepCounter.reset();
    };
  };
});

// Update elements when the display is turned on
display.addEventListener("change", () => {
  if (display.on) {
    // start sensors
    switchView.draw();
    statsInd.start();
  } else {
    statsInd.stop();
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
  utils.showElement(bdspskin, skinType==2);
  utils.showElement(ptskin, skinType==1);
  utils.showElement(dpskin, skinType==0);
  // Update the size of the screen
  face.groupTransform.translate.x = -Math.ceil((skinType==3 ? 0.035 * device.screen.width: 0));
  face.groupTransform.translate.y = -Math.ceil((skinType==3 ? 0.03 * device.screen.height: 0));
  face.groupTransform.scale.x = (skinType==3 ? 100 / 81.5: 1);
  face.groupTransform.scale.y = (skinType==3 ? 100 / 93.5: 1);
}

// change how secondary buttons are handeled
let updateSecondaryButtons = function(sec) {
  // update the counter
  countCounter.updateSecondary(sec);
}
let updateLongPressTime = function(timeselect) {
  countCounter.updateLongPress(timeselect);
}
let updateMultiTapTime = function(timeselect) {
  countCounter.updateMultiTap(timeselect);
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
    settings.isPresent("activeApps", switchView.appSettings);
    // Choose the mascot
    settings.isPresent("mascotSprite", timeInd.switchMascot);
    // set secondary buttons
    settings.isPresent("secondInteract", updateSecondaryButtons);
    settings.isPresent("longPressTime", updateLongPressTime);
    settings.isPresent("multiTapTime", updateMultiTapTime);
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
