/**
 * A renderable class.
 */

var Renderable = (function() {

  /**
   * A renderable objet.
   */
  function Renderable() {
    this.onRender    = function() {};
    this.sceneObject = null;
  }

  /**
   * Sets the render function.
   *
   * @param fn
   */
  Renderable.prototype.setOnRender = function(fn) {
    this.onRender = fn;
  }

  /**
   * Clears the render function.
   */
  Renderable.prototype.clearRender = function() {
    this.onRender = function() {};
  }

  /**
   * Sets the scene object.
   *
   * @param o
   */
  Renderable.prototype.setSceneObject = function(o) {
    this.sceneObject = o;
  }

  /**
   * Gets the scene object.
   */
  Renderable.prototype.getSceneObject = function() {
    return this.sceneObject;
  }

  /**
   * Renders the object.
   */
  Renderable.prototype.render = function() {
    this.onRender();
  }

  return Renderable;

})();

