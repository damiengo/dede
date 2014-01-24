/**
 * The view.
 */

var View = (function(THREE) {

  /* Class vars */
  var scene             = null;
  var renderer          = null;
  var camera            = null;
  var renderables       = null;

  /**
   * Constructor.
   */
  var View = function() {
    scene       = new THREE.Scene();
    renderer    = new THREE.WebGLRenderer();
    renderables = [];

    // Init
  	init();
    cam();
    light();
    render();
  }

  /**
   * Ajoute un nouvel objet Renderable.
   *
   * @param renderable
   */
  View.prototype.addRenderable = function(renderable) {
    scene.add(renderable.getSceneObject());
    renderables.push(renderable);
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
    var rLength = renderables.length;
    for(var i=0 ; i<rLength ; i++) {
      renderables[i].render();
    }
    renderer.render(scene, camera);
  }

  return View;

})(THREE);
