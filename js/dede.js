// Scene
var scene = new THREE.Scene();
// Renderer
var renderer = new THREE.WebGLRenderer();
// Cube
var cube = null;
// Camera
var camera = null;

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
  //@todo Add
  //var txt = textTexture("8");
  var material = new THREE.MeshLambertMaterial( { color: 0x0000ff } );
  cube = new THREE.Mesh( geometry, material );
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
  context.font = "Bold 40px Arial";
  context.fillStyle = "rgba(255,0,0,0.95)";
  context.fillText(text, 0, 50);
  
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
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.05;
  renderer.render(scene, camera);
}

