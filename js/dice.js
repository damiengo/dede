/**
 * The dice.
 */

var Dice = (function(THREE) {

  /* Class vars */
  var scene     = null;
  var diceFaces = null;
  var deltaX    = null;
  var deltaY    = null;
  var deltaZ    = null;  
  var color     = null;

  /**
   * Constructor.
   *
   * @param pScene
   * @param pColor
   * @param pNumbers
   */
  function Dice(pScene, pColor, pNumbers) {
    scene = pScene;

    // Dices faces
    diceFaces = [
      [1, 2, 2], 
      [2, 2, 2], 
      [3, 2, 2], 
      [4, 2, 0], 
      [2, 1, 2], 
      [2, 3, 2] 
    ];
    // Deltas
    deltaX = 0.05;
    deltaY = 0.05;
    deltaZ = 0.05;

    // Color
    color = pColor || "0000ff";

    // Init
    var geometry = new THREE.CubeGeometry(2,2,2);

    var numbers = pNumbers || [1, 2, 3, 4, 5, 6];

    var materials = [];
    materials.push(new THREE.MeshLambertMaterial({ map: textTexture(numbers[0]) })); // right face
    materials.push(new THREE.MeshLambertMaterial({ map: textTexture(numbers[1]) })); // left face
    materials.push(new THREE.MeshLambertMaterial({ map: textTexture(numbers[2]) })); // top face
    materials.push(new THREE.MeshLambertMaterial({ map: textTexture(numbers[3]) })); // bottom face
    materials.push(new THREE.MeshLambertMaterial({ map: textTexture(numbers[4]) })); // front face
    materials.push(new THREE.MeshLambertMaterial({ map: textTexture(numbers[5]) })); // back face

    var cubeMaterial = new THREE.MeshFaceMaterial(materials);

    cube = new THREE.Mesh( geometry, cubeMaterial );
    scene.add( cube );

    // Renderable
    this.setOnRender(this.rotateCube);
  }

  /* Dice extends Renderable */
  Dice.prototype = new Renderable();

  /**
   * Creates a texture with a text.
   *
   * @param text
   *
   * @return Texture
   */
  var textTexture = function (text) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.fillStyle = "#"+color;
    context.fillRect(0,0,300,150);
    context.fillStyle = "rgba(255,255,255,1)";
    context.font = "Bold 60px Arial";
    var textWidth = context.measureText(text).width;
    context.fillText(text, 150 - textWidth/2, 100);
    
    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas); 
    texture.needsUpdate = true;

    return texture;
  }

  /**
   * Function to rotate the cube.
   */
  Dice.prototype.rotateCube = function() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.03;
    cube.rotation.z += 0.05;
    // Reset if greater than 2 PI
    if(cube.rotation.x > (2*Math.PI)) {
      cube.rotation.x = 0;
    }
    if(cube.rotation.y > (2*Math.PI)) {
      cube.rotation.y = 0;
    }
    if(cube.rotation.z > (2*Math.PI)) {
      cube.rotation.z = 0;
    }
  }

  /**
   * Translate the dice to one face.
   *
   * @param nb          The face number to display
   * @param endCallback Function to call after the end
   */
  Dice.prototype.showFace = function(nb, endCallback){
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

  return Dice;

})(THREE);
