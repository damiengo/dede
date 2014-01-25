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
  	light = new THREE.SpotLight(0xff0000, 0.5);
    light.position.set(50, 150, 150);
    light.angle = 20 * Math.PI / 180;
    light.exponent = 1;
    light.target.position.set(0, 0, 0);
    this.setSceneObject(light);
  }

  /* Dice extends Renderable */
  Spot.prototype = new Renderable();

  /**
   * Highlights a field.
   */
  Spot.prototype.highlight = function() {
    var t = new Date().getTime();
    light.target.position.x = Math.cos(t/600)*25;
    light.target.position.y = 60-Math.sin(t/900)*25;
    light.target.position.z = Math.sin(t/600)*25;
  }

  return Spot;

})(THREE);
