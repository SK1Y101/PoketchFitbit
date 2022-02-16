// Import the fitbit builtins

// Define any helper functions
import * as utils from "../../common/utils";

// Define this module
export let WeatherApp = function(doc) {

  // fetch the ui elements

  // icons
  //const weatherIcon = doc.getElementById("weather_icon");
  const forecast1Icon = doc.getElementById("forecast_1_icon");
  //const forecast2Icon = doc.getElementById("forecast_2_icon");
  //const forecast3Icon = doc.getElementById("forecast_3_icon");
  //const moonPhaseIcon = doc.getElementById("moon_icon");

  // text
  //const weatherLoc = doc.getElementById("weather_loc");
  //const weatherTemp = doc.getElementById("weather_temp");
  //const weatherDesc = doc.getElementById("weather_desc");
  const forecast1Temp = doc.getElementById("forecast_1_temp");
  const forecast1Feel = doc.getElementById("forecast_1_feel");
  const forecast1Time = doc.getElementById("forecast_1_time");
  //const forecast2Temp = doc.getElementById("forecast_2_temp");
  //const forecast2Feel = doc.getElementById("forecast_2_feel");
  //const forecast2Time = doc.getElementById("forecast_2_time");
  //const forecast3Temp = doc.getElementById("forecast_3_temp");
  //const forecast3Feel = doc.getElementById("forecast_3_feel");
  //const forecast3Time = doc.getElementById("forecast_3_time");

  // change a time to the required format
  //let toFormat = function(dt) {
  //  var h = dt.getHours();
  //  var m = dt.getMinutes();
  //  return h.toString().padStart(2, "0") + ":" + m.toString().padStart(2, "0");
  //};

  // update the forecast elements
  let updateForecast = function(forecast, iconEle, tempEle, feelEle, timeEle) {
    iconEle.href = forecast.icon;
    tempEle.text = forecast.temp;
    feelEle.text = forecast.feel;
    var thistime = new Date(forecast.time * 1000);
    timeEle.text = thistime.getHours() + ":" + thistime.getMinutes();
  };

  updateForecast({icon: "weather/03d.png", temp:"13.0°", feel:"11.4°", time:1644919200,}, forecast1Icon, forecast1Temp, forecast1Feel, forecast1Time);

  // update the display when we recieve new message data
  //this.updateDisplay = function(data) {
    // tell the thingy
  //  console.log("Weather data recieved by device");

    // and draw the things!
  //  weather_desc.text = data.current.desc;
  //};
};
