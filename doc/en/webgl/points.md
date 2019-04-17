# Rendering points with WebGL

In the previous step, we rendered point features with the normal vector layer.  This layer uses the 2D canvas context for rendering.  With this layer, you can render tens of thousands of points – as long as you are careful about writing efficient styling code.  For rendering larger numbers of points, or to do more efficient dynamic styling, WebGL is a good solution.  OpenLayers has a growing set of utilities for rendering with WebGL.  WebGL rendering is currently limited to points, and that is what we'll do in this exercise.

First, we'll import the constructor for the WebGL point renderer and a math utility function:

[import:'imports'](../../../src/en/examples/webgl/squares.js)

TODO: words

[import:'points'](../../../src/en/examples/webgl/squares.js)

TODO: words

[import:'layer'](../../../src/en/examples/webgl/squares.js)

TODO: words

[import:'fragment'](../../../src/en/examples/webgl/circles.js)

TODO: screenshot
