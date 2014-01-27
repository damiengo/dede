/**
 * The dice.
 */

var Dice = (function(THREE) {

  /* Class vars */
  var diceFaces   = null;
  var deltaX      = null;
  var deltaY      = null;
  var deltaZ      = null;  
  var color       = null;
  var faceNumbers = null;

  /**
   * Constructor.
   *
   * @param pColor
   * @param pNumbers
   */
  var Dice = function(pColor, pNumbers) {

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
    deltaX = 0.02;
    deltaY = 0.02;
    deltaZ = 0.02;

    // Color
    color = pColor || "0000ff";

    // Init
    var geometry = new THREE.CubeGeometry(2,2,2);

    var numbers = pNumbers || [1, 2, 3, 4, 5, 6];
    faceNumbers = numbers;

    this.sceneObject = new THREE.Mesh( geometry );
    this.setFaces(numbers);
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
   * Set the dice faces.
   *
   * @param numbers
   */
  Dice.prototype.setFaces = function(numbers) {
    var materials = [];
    materials.push(new THREE.MeshLambertMaterial({ map: textTexture(numbers[5]) })); // right face
    materials.push(new THREE.MeshLambertMaterial({ map: textTexture(numbers[4]) })); // left face
    materials.push(new THREE.MeshLambertMaterial({ map: textTexture(numbers[2]) })); // top face
    materials.push(new THREE.MeshLambertMaterial({ map: textTexture(numbers[0]) })); // bottom face
    materials.push(new THREE.MeshLambertMaterial({ map: textTexture(numbers[1]) })); // front face
    materials.push(new THREE.MeshLambertMaterial({ map: textTexture(numbers[3]) })); // back face

    var cubeMaterial = new THREE.MeshFaceMaterial(materials);
    this.sceneObject.material = cubeMaterial;
  }

  /**
   * Function to rotate the this.sceneObject.
   *
   * @param deltaTime
   */
  Dice.prototype.rotateCube = function(deltaTime) {
    this.sceneObject.rotation.x += deltaTime + deltaX;
    this.sceneObject.rotation.y += deltaTime + deltaY;
    this.sceneObject.rotation.z += deltaTime + deltaZ;
    // Reset if greater than 2 PI
    if(this.sceneObject.rotation.x > (2*Math.PI)) {
      this.sceneObject.rotation.x = 0;
    }
    if(this.sceneObject.rotation.y > (2*Math.PI)) {
      this.sceneObject.rotation.y = 0;
    }
    if(this.sceneObject.rotation.z > (2*Math.PI)) {
      this.sceneObject.rotation.z = 0;
    }
  }

  /**
   * Translate the dice to one face.
   *
   * @param nb          The face number to display
   * @param deltaTime   The time delta
   * @param endCallback Function to call after the end
   */
  Dice.prototype.showFace = function(nb, deltaTime, endCallback){
    var x = diceFaces[nb][0];
    var y = diceFaces[nb][1];
    var z = diceFaces[nb][2];
    if(this.sceneObject.rotation.x < (x * Math.PI/2)) {
      this.sceneObject.rotation.x += deltaTime + deltaX;
    }
    if(this.sceneObject.rotation.x > (x * Math.PI/2)) {
      this.sceneObject.rotation.x -= deltaTime + deltaX;
    }
    if(this.sceneObject.rotation.y < (y * Math.PI/2)) {
      this.sceneObject.rotation.y += deltaTime + deltaY;
    }
    if(this.sceneObject.rotation.y > (y * Math.PI/2)) {
      this.sceneObject.rotation.y -= deltaTime + deltaY;
    }
    if(this.sceneObject.rotation.z < (z * Math.PI/2)) {
      this.sceneObject.rotation.z += deltaTime + deltaZ;
    }
    if(this.sceneObject.rotation.z > (z * Math.PI/2)) {
      this.sceneObject.rotation.z -= deltaTime + deltaZ;
    }
    // If arrived
    var arrived = true;
    if(Math.abs((x * Math.PI/2) - this.sceneObject.rotation.x) < (deltaTime + deltaX)) {
      this.sceneObject.rotation.x = x * Math.PI/2;
    }
    else {
      arrived = false;
    }
    if(Math.abs((y * Math.PI/2) - this.sceneObject.rotation.y) < (deltaTime + deltaY)) {
      this.sceneObject.rotation.y = y * Math.PI/2;
    }
    else {
      arrived = false;
    }
    if(Math.abs((z * Math.PI/2) - this.sceneObject.rotation.z) < (deltaTime + deltaZ)) {
      this.sceneObject.rotation.z = z * Math.PI/2;
    }
    else {
      arrived = false;
    }
    if(arrived) {
      if(endCallback) endCallback();
    }
  }

  return Dice;

})(THREE);
