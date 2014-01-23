/**
 * the main application.
 */

var App = (function(THREE) {

  /* Class vars */
  var scene             = null;
  var renderer          = null;
  var camera            = null;
  var dice              = null;
  var configElem        = null;
  var configNumbersElem = null;

  /**
   * Constructor.
   */
  function App() {
    scene    = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    camera   = null;
  }

  /**
   * The runner.
   */
  App.prototype.run = function() {
    initElems();
    initConfig();
    init();
    ihm();
    cam();
    light();
    dice = new Dice(scene, "00ff00", [7, 8, 9, 10, 11, 12]);
    render();
  }

  /**
   * Creates scene.
   */
  var init = function() {
    renderer.setSize( window.innerWidth-30, window.innerHeight-30 );
    renderer.setClearColor( 0xffffff, 0 );
    document.body.appendChild( renderer.domElement );
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
          });
        });
      }, 3000);
    };
  }

  /**
   * Creates camera.
   */
  var cam = function() {
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;
  }

  /**
   * Creates light.
   */
  var light = function() {
    // create a point light
    var pointLight = new THREE.PointLight(0xFFFFFF);

    // set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;

    // add to the scene
    scene.add(pointLight);
  }

  /**
   * Creates axes.
   */
  var axes = function() {
    // X axe
    var xMaterial = new THREE.LineBasicMaterial({color: 0xff0000});
    var xGeometry = new THREE.Geometry();
    xGeometry.vertices.push(new THREE.Vector3(-3, 0, 0));
    xGeometry.vertices.push(new THREE.Vector3( 3, 0, 0));
    var xLine = new THREE.Line(xGeometry, xMaterial);
    scene.add(xLine);
    // Y axe
    var yMaterial = new THREE.LineBasicMaterial({color: 0x00ffff});
    var yGeometry = new THREE.Geometry();
    yGeometry.vertices.push(new THREE.Vector3(0,-3, 0));
    yGeometry.vertices.push(new THREE.Vector3(0, 3, 0));
    var yLine = new THREE.Line(yGeometry, yMaterial);
    scene.add(yLine);
    // Z axe
    var zMaterial = new THREE.LineBasicMaterial({color: 0x00ffff});
    var zGeometry = new THREE.Geometry();
    zGeometry.vertices.push(new THREE.Vector3(0, 0,-3));
    zGeometry.vertices.push(new THREE.Vector3(0, 0, 3));
    var zLine = new THREE.Line(zGeometry, zMaterial);
    scene.add(zLine);
  }

  /**
   * Renders.
   */
  var render = function() {
    requestAnimationFrame(render);
    dice.render();
    renderer.render(scene, camera);
  }

  return App;

})(THREE);

// Launch the application
var app = new App();
app.run();
