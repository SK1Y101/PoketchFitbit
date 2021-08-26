//Fetch the inbuilt modules
import { me as device } from "device";
import { readFileSync, unlinkSync, writeFileSync } from "fs"

//Set some default values
var scale = 0;

//Show an error message alongside a log
export function logerror(error, text) {
  console.log(error+"; "+text);
};

//Fetch an element from the document
export function fetch(doc,name,idType) {
  if (idType) {
    return doc.getElementsByClassName(name);
  } else {
    return doc.getElementById(name);
  };
};

//rescale the background such that everything is square
export function getScale(doc) {
  let background = fetch(doc,"background");
  scale = device.screen.height/300;
  background.x = (device.screen.width-device.screen.height)/2;
  background.height = device.screen.height;
  background.width = device.screen.height;
  return scale
};

//Rescale all text elements
export function reScale(doc,elemname,scale) {
  let ele = fetch(doc,elemname,1);
  ele.forEach(function(elem) {
    elem.style.fontSize*=scale;
    elem.style.width*=scale;
    elem.style.height*=scale;
  });
};

// Update the analogue time elements
export function updateHand(arc,hand,angle) {
  arc.sweepAngle = angle;
  hand.groupTransform.rotate.angle = angle;
};

// Update angle of an arc, as defined by it's maximum value
export function setAngle(arc, maxVal, curVal, sweepAngle) {
  let sweep = (sweepAngle ? sweepAngle : 360);
  try {
    try {
      arc.forEach(function(ele) {
        ele.sweepAngle = sweep*Math.min(1,(maxVal > 0 ? curVal / maxVal : 0));
      });
    } catch {
      arc.sweepAngle = sweep*Math.min(1,(maxVal > 0 ? curVal / maxVal : 0));
    };
  } catch(err) {
    logerror(err,"set angle");
  };
};

//get the text of an element(s)
export function getText(ele) {
  try {
    let text = "";
    try {
      ele.forEach(function(eles) {
        text = eles.text;
      });
    } catch(err) {
      text = ele.text;
    };
    return text
  } catch(err) {
    logerror(err,"get text");
    return null
  };
};

//set the text of an element(s)
export function setText(ele,text) {
  try {
    text = (typeof(text) !== "string" ? text.toString() : text);
    try {
      ele.forEach(function(eles) {
        eles.style.textLength = text.length;
        eles.text=text;
      });
    } catch(err) {
      ele.style.textLength = text.length;
      ele.text=text;
    };
  } catch(err) {
    logerror(err,"set text");
  };
};

//Capitalise the word well
export function toCap(text) {
  text = (typeof(text) !== "string" ? text.toString() : text);
  return text.charAt(0).toUpperCase() + text.slice(1)
};

//Return the padded form of text
export function getPad(text,def) {
  return (def+text).slice(-def.length);
};

//Pad the text provided so it has a fixed length
export function padText(ele,text,def) {
  setText(ele,getPad(text,def));
};

//Set the text of an element(s) such that it will automatically scale
export function textSize(ele,text,size,scalar) {
  try {
    text = (typeof(text) !== "string" ? text.toString() : text);
    try {
      ele.forEach(function(eles) {
        eles.text = text;
        eles.style.textLength = text.length;
        eles.style.fontSize=Math.floor(Math.min(1,size/(1+text.length)) * scalar * scale);
      });
    } catch(err) {
      ele.text = text;
      ele.style.textLength = text.length;
      ele.style.fontSize=Math.floor(Math.min(1,size/(1+text.length)) * scalar * scale);
    };
  } catch(err) {
    logerror(err,"scaled text");
  };
};

//Set the colour of elements
export function colourElements(ele,colour) {
  try {
    try {
      ele.forEach(function(eles) {
        eles.style.fill=colour;
      });
    } catch(err) {
      ele.style.fill=colour;
    };
  } catch(err) {
    logerror(err,"colour");
  };
};

//set elements to either visible or not
export function setVisible(ele,show) {
  try {
    try {
      ele.forEach(function(eles) {
        eles.style.display=show;
      });
    } catch(err) {
      ele.style.display=show;
    };
  } catch(err) {
    logerror(err,"visibility");
  };
};

//animate an element(s)
export function animate(ele) {
  try {
    try {
      ele.forEach(function(eles) {
        eles.animate("enable")
      });
    } catch(err) {
      ele.animate("enable");
    };
  } catch(err) {
    logerror(err,"animation");
  };
};

//Force a field to be an array
export function forceArray(arr) {
  if (typeof(arr) !== "object") {
    return [arr];
  }
  return arr;
};

export function saveData(filename,data,overwriteFilename) {
  try {
    filename = (overwriteFilename ? "" : "_skiylian_") + filename;
    writeFileSync(filename, data, "cbor");
  } catch(err) {
    logerror(err,"save "+filename);
  };
};

//Fetch data saved to the disk
export function loadData(filename,defaults,overwriteFilename) {
  try {
    filename = (overwriteFilename ? "" : "_skiylian_") + filename;
    defaults = readFileSync(filename, "cbor");
  } catch(err) {
    logerror(err,"fetch "+filename);
  };
  return defaults;
};

//Remove data saved to the disk
export function removeData(fName,defName) {
  try {
    filename = (defName ? "" : "_skiylian_") + fName;
    unlinkSync(fName);
  } catch(err) {
    logerror(err,"remove "+fName);
  };
};
