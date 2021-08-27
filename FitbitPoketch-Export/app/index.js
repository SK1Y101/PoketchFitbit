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
import { TimeIndicator } from "./Poketch/clock";

// And fetch a reference to the modules
let timeInd = new TimeIndicator(document);

// Set the default values of all options
let DefSet = function() {
  var defaults = {
    skin: 1,
    edgeColour: "#3050F8",
    faceColour: "#030303",
    screenColour: "#70B070",
  };
  return defaults;
};

// Fetch the settings, passing the defaults too
let settings = new Settings("settings.cbor", DefSet);

// Define the clock tick rate
clock.granularity = "minutes"; // seconds, minutes, hours

// fetch elementss
const bg = document.getElementById("background");
const fc = document.getElementsByClassName("face_colour");
const sc = document.getElementsByClassName("screen_colour");

const dpskin = document.getElementsByClassName("dp_skin");
const ptskin = document.getElementsByClassName("pt_skin");

const face = document.getElementById("screen");
console.log(face)
console.log((0x70b070 + 0x103010).toString(16));

// click testing
const fbut = document.getElementById("fore_button");
const bbut = document.getElementById("back_button");
const vchang = document.getElementsByClassName("view_change");

const ubut = document.getElementsByClassName("button_top");
const lbut = document.getElementsByClassName("button_bottom");

let animateChange = function() {
  vchang.forEach(function(ele) {
    ele.animate("enable");
  });
};

let animateButton = function(ele, trigger) {
  ele.forEach(function(eles) {
    eles.animate(trigger);
  });
};

fbut.addEventListener("mouseup", (evt) => {
  animateChange();
  animateButton(lbut, "mouseup");
});
fbut.addEventListener("mousedown", (evt) => {
  animateButton(lbut, "mousedown");
});
bbut.addEventListener("mouseup", (evt) => {
  animateChange();
  animateButton(ubut, "mouseup");
});
bbut.addEventListener("mousedown", (evt) => {
  animateButton(ubut, "mousedown");
});

// Update elements once a minute
clock.addEventListener("tick", (evt) => {
  // Fetch the current time
  let now = evt.date;
  // Update the watch
  timeInd.drawTime(now);
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
  // Update the size of the screen
  face.groupTransform.translate.x = -Math.ceil((skinType==2 ? 0.035 * device.screen.width: 0));
  face.groupTransform.translate.y = -Math.ceil((skinType==2 ? 0.03 * device.screen.height: 0));
  face.groupTransform.scale.x = (skinType==2 ? 100 / 82: 1);
  face.groupTransform.scale.y = (skinType==2 ? 100 / 94: 1);
}

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
