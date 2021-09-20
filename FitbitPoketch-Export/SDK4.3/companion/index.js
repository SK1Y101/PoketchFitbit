//Import the inbuilt fitbit modules
import { me } from "companion";
import { peerSocket } from "messaging";
import { settingsStorage } from "settings";

//Import our custom modules
import * as setDefaults from "./setdefaults";

setDefaults.init();

//set the message format
let sendValue = function(key, val, type) {
  if (val) {
    sendData({
      key: key,
      value: JSON.parse(val),
      type: type
    });
  };
};

//send the message if socket is open
function sendData(data) {
  if (peerSocket.readyState === peerSocket.OPEN) {
    peerSocket.send(data);
  } else {
    console.log("Connection is not open");
  };
};

//Send settings if they have changed
settingsStorage.addEventListener("change", evt => {
  if (evt.oldValue !== evt.newValue) {
    sendValue(evt.key, evt.newValue, "settings");
  };
});

//If we receive a message from the device
peerSocket.onmessage = function(evt) {
  if ((evt.data) && (evt.data.type == "weather")) {
    weatherCompanion.onMessage(evt.data.fetchtype);
  };
};

//log any errors we have
peerSocket.onerror = function(err) {
  console.log("Connection error: " + err.code + " - " + err.message);
};

function doThis(position) {
  console.log("Significant location change! ${JSON.stringify(position)}");
}

me.monitorSignificantLocationChanges = true;
me.addEventListener("significantlocationchange", doThis);

//log if the companion was awoken
let lr = me.launchReasons;
if (me.launchReasons) {
  if (lr.wokenUp) {
    console.log("Started due to wake interval!");
  };
  if (lr.locationChanged) {
    weatherCompanion.onMessage(lr.locationChanged.position);
  };
}
