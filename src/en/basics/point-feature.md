# Drawing a Point at Your Location

Now that we have a map centered on our location, we also want to show the exact location by rendering a point at it.

## Working Example

In addition to drawing maps from tiles provided by a tile service, OpenLayers can render vector data. A vector layer has a source which contains features. In this simple example, we just add a single feature with a point geometry that represents our location.

A few more imports are required:

[import:'import'](../examples/basics/point-feature.js)

The vector layer itself is created with the following code:

[import:'point-layer'](../examples/basics/point-feature.js)

We also need to add a point feature to that vector layer as soon as we know our location. This is done with a single line in the `geolocation`'s' `getCurrentPosition` callback:

[import:'add-point'](../examples/basics/point-feature.js)

The complete `main.js` file now looks like this:

[import](../examples/basics/point-feature.js)

### Tasks

1.  Copy the JS above and paste it into `main.js`.

1.  Look at the working map in your web browser: {{ book.workshopUrl }}. When asked whether you want to give the page access to your location, answer 'Yes'. When zoomed to your location, you should see a blue circle indicating your position.
