/**
 * Spot.
 */

var Spot = (function(THREE) {

  /**
   * Spot.
   */
  var Spot = function() {
    this.sceneObject = new THREE.SpotLight( 0xdddddd, 1 );
    this.sceneObject.position.set( 0, 10, 10 );
    this.sceneObject.target.position = new THREE.Vector3(0, 0, 0);
    this.sceneObject.exponent = 10;
    this.sceneObject.angle = Math.PI/20;
  }

  /* Dice extends Renderable */
  Spot.prototype = new Renderable();

  /**
   * Highlights a field.
   */
  Spot.prototype.highlight = function(delta) {
    var t = new Date().getTime();
    this.sceneObject.position.x = Math.cos(t/600)*25;
    this.sceneObject.position.y = 60-Math.sin(t/900)*25;
    this.sceneObject.position.z = Math.sin(t/600)*25;
  }

  return Spot;

})(THREE);
