// Scene
var scene = new THREE.Scene();
// Renderer
var renderer = new THREE.WebGLRenderer();
// Cube
var cube = null;
// Camera
var camera = null;
// Rendering function
var onRender = function() {};
// Dices faces
var diceFaces = [
  [1, 2, 2], 
  [2, 2, 2], 
  [3, 2, 2], 
  [4, 2, 0], 
  [2, 1, 2], 
  [2, 3, 2] 
];
// Deltas
var deltaX = 0.05;
var deltaY = 0.05;
var deltaZ = 0.05;

// Launch
run();

/**
 * Running.
 */
function run() {
  init();
  ihm();
  cam();
  light();
  //axes();
  cub();
  render();
}

/**
 * Creates scene.
 */
function init() {
  renderer.setSize( window.innerWidth-30, window.innerHeight-30 );
  renderer.setClearColor( 0xffffff, 0 );
  document.body.appendChild( renderer.domElement );
  // Add the first rendering function
  //onRenderFcts.push(rotateCube);
  onRender = function() { 
    showFace(5); 
  };
}

/**
 * Sets the IHM.
 */
function ihm() {
  for(var i=0 ; i<6 ; i++) {
    var run = document.getElementById("run"+(i+1));
    // Outer function to unscope i
    !function outer(i) {
      run.onclick = function() {
        console.log("init: "+i);
        onRender = function() { 
          showFace(i);
        };
      };
    }(i)
  }
}

/**
 * Creates camera.
 */
function cam() {
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 5;
}

/**
 * Creates light.
 */
function light() {
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
 * Creates cube.
 */
function cub() {
  var geometry = new THREE.CubeGeometry(2,2,2);

  var materials = [];
  materials.push(new THREE.MeshLambertMaterial({ map: textTexture("1") })); // right face
  materials.push(new THREE.MeshLambertMaterial({ map: textTexture("2") })); // left face
  materials.push(new THREE.MeshLambertMaterial({ map: textTexture("3") })); // top face
  materials.push(new THREE.MeshLambertMaterial({ map: textTexture("4") })); // bottom face
  materials.push(new THREE.MeshLambertMaterial({ map: textTexture("5") })); // front face
  materials.push(new THREE.MeshLambertMaterial({ map: textTexture("6") })); // back face

  var cubeMaterial = new THREE.MeshFaceMaterial(materials);

  cube = new THREE.Mesh( geometry, cubeMaterial );
  scene.add( cube );
}

/**
 * Creates axes.
 */
function axes() {
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
 * Creates a texture with a text.
 *
 * @param text
 *
 * @return Texture
 */
function textTexture(text) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  context.fillStyle= "#0000ff";
  context.fillRect(0,0,300,150);
  context.fillStyle = "rgba(255,255,255,1)";
  context.font = "Bold 60px Arial";
  context.fillText(text, 130, 100);
  
  // canvas contents will be used for a texture
  var texture = new THREE.Texture(canvas); 
  texture.needsUpdate = true;

  return texture;
}

/**
 * Renders.
 */
function render() {
  requestAnimationFrame(render);
	onRender();
  renderer.render(scene, camera);
}

/**
 * Function to rotate the cube.
 */
function rotateCube() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.03;
  cube.rotation.z += 0.05;
}

/**
 * Translate the dice to one face.
 *
 * @param nb          The face number to display
 * @param endCallback Function to call after the end
 */
function showFace(nb, endCallback) {
  var x = diceFaces[nb][0];
  var y = diceFaces[nb][1];
  var z = diceFaces[nb][2];
  if(cube.rotation.x < (x * Math.PI/2)) {
    cube.rotation.x += deltaX;
  }
  if(cube.rotation.x > (x * Math.PI/2)) {
    cube.rotation.x -= deltaX;
  }
  if(cube.rotation.y < (y * Math.PI/2)) {
    cube.rotation.y += deltaY;
  }
  if(cube.rotation.y > (y * Math.PI/2)) {
    cube.rotation.y -= deltaY;
  }
  if(cube.rotation.z < (z * Math.PI/2)) {
    cube.rotation.z += deltaZ;
  }
  if(cube.rotation.z > (z * Math.PI/2)) {
    cube.rotation.z -= deltaZ;
  }
  // If arrived
  if(Math.abs((x * Math.PI/2) - cube.rotation.x) < deltaX) {
    cube.rotation.x = x * Math.PI/2;
  }
  if(Math.abs((y * Math.PI/2) - cube.rotation.y) < deltaY) {
    cube.rotation.y = y * Math.PI/2;
  }
  if(Math.abs((z * Math.PI/2) - cube.rotation.z) < deltaZ) {
    cube.rotation.z = z * Math.PI/2;
  }
}

