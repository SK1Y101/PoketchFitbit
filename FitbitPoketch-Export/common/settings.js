//Import the inbuilt modules
import { readFileSync, unlinkSync, writeFileSync } from "fs"

//Import our custom modules
import { logerror, forceArray } from "./utils";

export let Settings = function(settingsFile, defSet) {
  let self = this;

  let loadSettings = function(settingsFile, defSet) {
    try {
      return readFileSync(settingsFile,"cbor");
    } catch(err) {
      logerror("couldn't read settings",err);
      let rawDefaults = defSet();
      let Defaults = {};
      for (var key in rawDefaults) {
        let val = rawDefaults[key];
        if (typeof val === "boolean") {
          Defaults[key] = val;
        } else if (typeof val === "object") {
          let valarray = [];
          for (let i in val) {
            valarray.push({value: val[i]});
          };
          Defaults[key] = {values:valarray};
        } else {
          Defaults[key] = {values:[{value: val}]};
        };
      };
      return Defaults;
    };
  };

  self.sets = loadSettings(settingsFile, defSet);

  let getRawVal = function(key) {
    if (self.sets.hasOwnProperty(key)) {
      if (self.sets[key].hasOwnProperty("values")) {
        let temp = self.sets[key].values;
        if (temp.length > 1) {
          let out = [];
          for (let i in temp) {
            out.push(temp[i].value)
          };
          return out;
        } else {
          try {
            return self.sets[key].values[0].value;
          } catch(err) {
            return null;
          };
        };
      } else {
        return self.sets[key];
      };
    };
    return null;
  };

  self.getRaw = function(key) {
    return getRawVal(key);
  };

  self.inList = function(key, val) {
    return self.sets.hasOwnProperty(key) && (forceArray(getRawVal(key)).indexOf(val) !== -1);
  };

  self.isTrue = function(key) {
    return self.sets.hasOwnProperty(key) && !!self.sets[key];
  };

  self.isFalse = function(key) {
    return self.sets.hasOwnProperty(key) && !self.sets[key];
  };

  self.isPresent = function(key, action, secondVal) {
    let val = getRawVal(key);
    if (secondVal) {
      action(val,secondVal)
    } else {
      action(val);
    };
  };

  self.isEquals = function(key, testVal) {
    return getRawVal(key) === testVal;
  }

  self.getOrElse = function(key, defaultVal) {
    let val = getRawVal(key);
    if (val) {
      return val
    } else {
      return defaultVal;
    };
  };

  self.replaceSettings = function(newSet) {
    for (var key in newSet) {
      self.sets[key] = newSet[key];
    };
  };

  self.saveSettings = function() {
    try {
      writeFileSync(settingsFile,self.sets,"cbor");
    } catch(err) {
      logerror("couldn't save settings", err)
    };
  }
};
