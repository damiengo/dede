// Elements
var diceElem          = null;
var diceNumberElem    = null;
var configElem        = null;
var configNumbersElem = null;
var runButtonElem     = null;

var numbers = 20;
var nbLaunches = 0;
var randomizer = null;

/**
 * On document loaded.
 */
window.onload = function() {
  initElems();
  initConfig();
  initEvents();
}

/**
 * Initialize elements.
 */
var initElems = function() {
  diceElem          = document.getElementById("dice");
  diceNumberElem    = document.getElementById("dice-number");
  configElem        = document.getElementById("config");
  configNumbersElem = document.getElementById("config-numbers");
  runButtonElem     = document.getElementById("run-button");
}

/**
 * Initialize configuration.
 */
var initConfig = function() {
  var inputElem = null;
  var labelElem = null;
  var liElem    = null;
  for(var i=0 ; i<numbers ; i++) {
    inputElem = document.createElement("input");
    inputElem.type = "checkbox";
    inputElem.id = "config-numbers-"+i;
    inputElem.checked = true;
    labelElem = document.createElement("label");
    labelElem.htmlFor= "config-numbers-"+i;
    labelElem.innerHTML = i+1;
    liElem = document.createElement("li");
    liElem.appendChild(inputElem);
    liElem.appendChild(labelElem);
    configNumbersElem.appendChild(liElem);
  }
}

/**
 * Initialize events.
 */
var initEvents = function() {
  runButtonElem.onclick = function(e) {
    launchDice();
  };
}

/**
 * Dice launching.
 */
var launchDice = function() {
  var checkeds = getCheckeds();
  nbLaunches = Math.floor((Math.random()*10) + 10);
  randomizer = setInterval(function() {randomize(checkeds); }, 100);
}

/**
 * Randomizing.
 *
 * @param checkeds
 *
 * @return int
 */
var randomize = function(checkeds) {
  var maxRand = checkeds.length;
  var rand = Math.floor((Math.random()*maxRand));
  diceNumberElem.innerHTML = checkeds[rand] + 1;

  if(nbLaunches == 0) {
    document.getElementById("config-numbers-"+checkeds[rand]).checked = false;
    clearInterval(randomizer);
  }
  else {
    nbLaunches--;
  }
}

/**
 * Get checkeds boxes.
 */
var getCheckeds = function() {
  var inputs = document.getElementsByTagName("input");
  var inputsLength = inputs.length;
  var checkeds = new Array();
  for(var i=0 ; i< inputsLength ; i++) {
    if(inputs[i].type == "checkbox" && inputs[i].checked) {
      checkeds.push(i);
    }
  }

  return checkeds;
}

