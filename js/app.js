/**
 * the main application.
 */

var App = (function(THREE) {

  /* Class vars */
  var view              = null;
  var dice              = null;
  var spot              = null;
  var configElem        = null;
  var configNumbersElem = null;

  /**
   * Constructor.
   */
  function App() {
  }

  /**
   * The runner.
   */
  App.prototype.run = function() {
    initElems();
    initConfig();
    ihm();
    // Set view elements
    view = new View();
    dice = new Dice("0079a1");
    spot = new Spot();
    view.addRenderable(dice);
    view.addRenderable(spot);
  }

  /**
   * Initialize elements.
   */
  var initElems = function() {
    configElem        = document.getElementById("config");
    configNumbersElem = document.getElementById("config-numbers");
  }

  /**
   * Initialize configuration.
   */
  var initConfig = function() {
    var inputElem = null;
    var labelElem = null;
    var liElem    = null;
    var numbers   = 20;
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

  /**
   * Sets the IHM.
   */
  var ihm = function() {
    var go = document.getElementById("run");
    go.onclick = function() {
      var checkeds = getCheckeds();
      var num = checkeds;
      num.sort( function() { return 0.5 - Math.random() } );
      num = num.map(function(checked) {
        return checked+1;
      });
      if(num.length < 6) {
        num = num.concat(num).concat(num).concat(num).concat(num).concat(num);
      }
      dice.setFaces(num);
      // Rotate
      dice.setOnRender(function() {
        dice.rotateCube();
      });
      // Show alea faces
      setTimeout(function(){
        var nb = Math.floor((Math.random()*6));
        dice.setOnRender(function() {
          dice.showFace(nb, function() {
            document.getElementById("config-numbers-"+(num[nb]-1)).checked = false;
            dice.clearRender();
            // Change spot rendering
            spot.setOnRender(function() {
              spot.highlight();
            });
          });
        });
      }, 3000);
    };
  }

  return App;

})(THREE);

// Launch the application
var app = new App();
app.run();
