/**
 * A renderable class.
 */

var Renderable = (function() {

  /* Function to call on render */
  var onRender = null;

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
   * Renders the object.
   */
  Renderable.prototype.render = function() {
    onRender();
  }

  return Renderable;

})();

