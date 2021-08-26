/*
 * Entry point for the watch app
 */

console.log("App code started");

import clock from "clock";
import * as document from "document";

clock.granularity = "minutes"; // seconds, minutes, hours

const hourTen = document.getElementById("hour_ten");
const hourOne = document.getElementById("hour_one");
const minTen = document.getElementById("min_ten");
const minOne = document.getElementById("min_one");

clock.addEventListener("tick", (evt) => {
  let timeString = evt.date.toTimeString().slice(0, 5);
  hourTen.href = "icons/digit_" + timeString[0] + ".png";
  hourOne.href = "icons/digit_" + timeString[1] + ".png";
  minTen.href = "icons/digit_" + timeString[3] + ".png";
  minOne.href = "icons/digit_" + timeString[4] + ".png";
});
