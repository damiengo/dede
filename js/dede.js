// Elements
var diceElem          = null;
var diceNumberElem    = null;
var configElem        = null;
var configNumbersElem = null;
var runButtonElem     = null;

var numbers = 16;

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
  diceNumberElem.innerHTML = 1;
}

