/**
 * A renderable class.
 */

var Renderable = (function() {

  /* Function to call on render */
  var onRender = null;

  /* The scene object */
  var sceneObject = null;

  /**
   * A renderable objet.
   */
  function Renderable() {
    onRender = function() {};
  }

  /**
   * Sets the render function.
   *
   * @param fn
   */
  Renderable.prototype.setOnRender = function(fn) {
    onRender = fn;
  }

  /**
   * Clears the render function.
   */
  Renderable.prototype.clearRender = function() {
    onRender = function() {};
  }

  /**
   * Sets the scene object.
   *
   * @param o
   */
  Renderable.prototype.setSceneObject = function(o) {
    sceneObject = o;
  }

  /**
   * Gets the scene object.
   */
  Renderable.prototype.getSceneObject = function() {
    return sceneObject;
  }

  /**
   * Renders the object.
   */
  Renderable.prototype.render = function() {
    onRender();
  }

  return Renderable;

})();

