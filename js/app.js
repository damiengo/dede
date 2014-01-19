/**
 * the main application.
 */

var App = (function(THREE) {

  /* Class vars */
  var scene    = null;
  var renderer = null;
  var camera   = null;
  var dice     = null;

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
    init();
    ihm();
    cam();
    light();
    dice = new Dice(scene);    
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
   * Sets the IHM.
   */
  var ihm = function() {
    for(var i=0 ; i<6 ; i++) {
      var run = document.getElementById("run"+(i+1));
      // Outer function to unscope i
      !function outer(i) {
        run.onclick = function() {
          dice.setOnRender(function() {
            dice.showFace(i);
          });
        };
      }(i)
    }
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
