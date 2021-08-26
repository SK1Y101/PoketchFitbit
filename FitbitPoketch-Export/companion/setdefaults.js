//Import the inbuilt modules
import { settingsStorage } from "settings";

function fetchdefs() {
  var defaults = {
    skin: {name:"Platinum", value:1, subname:"The Pokétch given to the protagonist in Platinum."},
    edgeColour: {name: "D/P Blue", icon:"https://www.colorhexa.com/3050F8.png", value: "#3050F8", subname:"The Male Pokétch colour in Diamond and Pearl."},
    faceColour: {name: "D/P", icon:"https://www.colorhexa.com/303030.png", value: "#303030", subname:"The Pokétch face colour in Diamond and Pearl."},
  };

  let Defaults = {};
  for (var key in defaults) {
    let val = defaults[key];
    if (typeof val === "boolean") {
      Defaults[key] = val;
    } else {
      Defaults[key] = {values:[{name: val["name"], value: val["value"]}],selected:val["selected"]};
    };
  };
  return Defaults;
};

export function init() {
  let defs = fetchdefs();
  for (let i in defs) {
    let exp = settingsStorage.getItem(i);
    if (exp === null) {
      settingsStorage.setItem(i, JSON.stringify(defs[i]));
    };
  };
  console.log("loaded defaults for companion");
};
