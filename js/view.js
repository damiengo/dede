/**
 * The view.
 */

var View = (function(THREE) {

  /* Class vars */
  var scene             = null;
  var renderer          = null;
  var camera            = null;

  /**
   * Constructor.
   */
  var View = function() {
    scene            = new THREE.Scene();
    renderer         = new THREE.WebGLRenderer();
    this.renderables = [];

    // Init
  	init();
    cam();
    light();
    //axes();
    stats();
    this.render();
  }

  /**
   * Ajoute un nouvel objet Renderable.
   *
   * @param renderable
   */
  View.prototype.addRenderable = function(renderable) {
    scene.add(renderable.getSceneObject());
    this.renderables.push(renderable);
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
   * Displays stats.
   */
  var stats = function() {
  	var stats = new Stats();
  	stats.setMode(0); // 0: fps, 1: ms

  	// Align top-left
  	stats.domElement.style.position = 'absolute';
  	stats.domElement.style.left = '0px';
  	stats.domElement.style.top = '0px';

  	document.body.appendChild( stats.domElement );

  	setInterval( function () {
  	    stats.begin();
  	    stats.end();
      }, 1000 / 60 );

  }

  /**
   * Renders.
   */
  View.prototype.render = function() {
    var vi = this;
    requestAnimationFrame(function() { vi.render(); });
    var rLength = this.renderables.length;
    for(var i=0 ; i<rLength ; i++) {
      this.renderables[i].render();
    }
    renderer.render(scene, camera);
  }

  return View;

})(THREE);
