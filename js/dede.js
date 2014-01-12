// Scene
var scene = new THREE.Scene();
// Renderer
var renderer = new THREE.WebGLRenderer();
// Cube
var cube = null;
// Camera
var camera = null;
// Rendering functions
var onRenderFcts = new Array();

// Launch
run();

/**
 * Running.
 */
function run() {
  init();
  cam();
  light();
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
  onRenderFcts.push(rotateCube);
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
	// call each update function
	onRenderFcts.forEach(function(onRenderFct){
	  onRenderFct();
	})
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

