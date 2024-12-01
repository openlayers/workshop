# Animating meteorite impacts

So far we have managed to get data from our CSV file rendered with WebGL, but the map is pretty uninteresting.  We're using the mass of the meteorite to determine the radius of the circle, but we're not making use of the meteorite impact date that we parsed as the `year` property in our point features.

The `year` property for our meteorite features have values that range from 1850 to 2015.  We'll set up an animation loop that increments the current year, render meteorites on their impact year, and then decrease their size and opacity as time passes.

As a first step, we'll get the animation loop going and render the current year to a `<div>` on top of the map.  Add the following markup below the map container in your `index.html`:

[import:'markup'](../../../src/en/examples/webgl/animated.html)

Edit the `<style>` block to include the following rule:

[import:'style', lang:'css'](../../../src/en/examples/webgl/animated.html)

Now, back in `main.js`, we'll declare some variables to represent the time range of the data and the rate at which we want the animation to proceed.  Add the following code above your `const meteorites` declaration in `main.js`:

[import:'years'](../../../src/en/examples/webgl/animated.js)

To be able to access the current year in style expressions, we need to use the `variables` constructor option on the meteorites layer and include the `currentYear` (whose value will start with `minYear`):

[import:'variables'](../../../src/en/examples/webgl/animated.js)

Style variables are values that are available in `var` expressions in the layer `style`.

Next we need to assign our map instance to a `map` variable that we can reference later:

[import:'declaration'](../../../src/en/examples/webgl/animated.js)

Below the map configuration, add the following `render` function to get the animation loop started. In this function, we'll update the current year and call `updateStyleVariables()` on the meteorites layer to update the year used in the style expressions.

[import:'animate'](../../../src/en/examples/webgl/animated.js)

If you got it all right, you should see the years rolling by in the lower left corner above the map.

![Through the years](years.gif)

We also add another layer option to the `meteorites` layer, which will improve the performance of the animation – we do not need to process hit detection data in every anmiation step.

[import:'hitdetection'](../../../src/en/examples/webgl/animated.js)

Now to show the temporal context on the map, we only want to show each meteorite for a period of 10 years, starting at the time of its impact. For this, we're adding a `filter` to the `meteorites` layer's `style` object:

[import:'filter'](../../../src/en/examples/webgl/animated.js)

The filter references a `periodStart` variable, which is an expression on its own that we need to define. While we're at it, we define a few more of those to use in the style object. Let's add the following above the `const meteorites` layer definition:

[import:'expressions'](../../../src/en/examples/webgl/animated.js)

The `decay` is an expression we're going to use to fade out circles by reducing their size and opacity. It gives us a value between `0` and `1`, which we can apply as multiplier for the fade effect. To use it for reducing the size over time, we have to modify the `circle-radius` in the `style` object:

[import:'size'](../../../src/en/examples/webgl/animated.js)

The existing expression is the fourth line of the new `circle-radius` expression.

For reducing the opacity over time, we also apply the `decay` to the `circle-fill-color`:

[import:'opacity'](../../../src/en/examples/webgl/animated.js)

Previously we had an `rgba` color, now we use a `color` expression consisting of `r`, `g`, `b` and `alpha` values. The `alpha` value is now dynamic and considers the decay.

![Meteor shower](shower.gif)

Congratulations!
