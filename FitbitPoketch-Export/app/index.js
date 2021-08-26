/*
 * Entry point for the watch app
 */

console.log("App code started");

import clock from "clock";
import * as document from "document";

clock.granularity = "seconds"; // seconds, minutes, hours

const clockLabel = document.getElementById("clock-label");

clock.addEventListener("tick", (evt) => {
  clockLabel.text = evt.date.toTimeString().slice(0, -4);
});
