/**
 * Spot.
 */

var Spot = (function(THREE) {

  /** Light **/
  var light = null;

  /**
   * Spot.
   */
  var Spot = function() {
  	light = new THREE.PointLight(0xffffff, 10);
    light.position.set(50, 150, 150);
  }

  /* Dice extends Renderable */
  Spot.prototype = new Renderable();

  /**
   * Highlights a field.
   */
  Spot.prototype.highlight = function() {
    light.position.x += 0.01;
    light.position.y += 0.03;
    light.position.z += 0.05;
  }

  return Spot;

})(THREE);
