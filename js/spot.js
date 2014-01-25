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
    light = new THREE.SpotLight( 0xffffff, 1 );
    light.position.set( 0, 20, 100 );
    light.target.position = new THREE.Vector3(0, 0, 0);
    light.exponent = 10;
    light.angle = Math.PI/220;
    this.setSceneObject(light);
  }

  /* Dice extends Renderable */
  Spot.prototype = new Renderable();

  /**
   * Highlights a field.
   */
  Spot.prototype.highlight = function() {
    var t = new Date().getTime();
    //light.position.x = Math.cos(t/600)*25;
    //light.position.y = 60-Math.sin(t/900)*25;
    //light.position.z = Math.sin(t/600)*25;
  }

  return Spot;

})(THREE);
