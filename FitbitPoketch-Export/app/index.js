// Import the included fitbit modules
import clock from "clock";
import { memory } from "system";
import document from "document";
import { display } from "display";
import { me as appbit } from "appbit";
import { peerSocket } from "messaging";

// Import the modules I have written
import * as utils from "../common/utils";
import { Settings } from "../common/settings";

// Quick debug log
console.log("Device JS memory: " + memory.js.used + "/" + memory.js.total);

// Set the default values of all options
let DefSet = function() {
  var defaults = {
    skin: 1,
    edgeColour: "#3050F8",
    faceColour: "#030303"
  };
  return defaults;
};

// Fetch the settings, passing the defaults too
let settings = new Settings("settings.cbor", DefSet);

// Show the memory usage once the settings have been loaded
console.log("Device JS memory: " + memory.js.used + "/" + memory.js.total);

// Define the clock tick rate
clock.granularity = "minutes"; // seconds, minutes, hours

const hourTen = document.getElementById("hour_ten");
const hourOne = document.getElementById("hour_one");
const minTen = document.getElementById("min_ten");
const minOne = document.getElementById("min_one");

const bg = document.getElementById("background");
const fc = document.getElementsByClassName("face_colour");

const dpskin = document.getElementsByClassName("dp_skin");
const ptskin = document.getElementsByClassName("pt_skin");

const face = document.getElementById("screen");
console.log(face)

// Update elements once a minute
clock.addEventListener("tick", (evt) => {
  let timeString = evt.date.toTimeString().slice(0, 5);
  hourTen.href = "icons/digit_" + timeString[0] + ".png";
  hourOne.href = "icons/digit_" + timeString[1] + ".png";
  minTen.href = "icons/digit_" + timeString[3] + ".png";
  minOne.href = "icons/digit_" + timeString[4] + ".png";
});

// Change the skin
let updateSkin = function(skinType) {
  // Hide all the skins
  console.log(skinType==1 ? "inline" : "none");
  ptskin.forEach(function(ele) {
    ele.style.display=(skinType==1 ? "inline" : "none")
  });
  dpskin.forEach(function(ele) {
    ele.style.display=(skinType==0 ? "inline" : "none")
  });
}

// Change the colour
let updateEdge = function(colour, ele) {
  try {
    ele.forEach(function(eles) {
      eles.style.fill = colour;
    });
  } catch(err) {
    ele.style.fill=colour;
  };
}

// Define a function to apply our settings
let applySettings = function() {
  if (! settings) {
    return;
  };
  try {
    // Set element colours
    settings.isPresent("skin", updateSkin);
    settings.isPresent("edgeColour", updateEdge, bg);
    settings.isPresent("faceColour", updateEdge, fc);
    // Show that settings have been loaded
    console.log("Settings applied");
  } catch (err) {
    utils.logerror(err,"Couldn't apply settings");
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
