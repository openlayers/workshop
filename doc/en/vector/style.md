# Making it look nice

At this point we have a feature editor with basic import, editing, and export functionality.  But we haven't spent any time trying to make the features look nice.  When you create a vector layer in OpenLayers, you get a set of default styles.  The editing interactions (draw and modify) also come with their own default styles.  You may have noticed how geometries had a thicker stroke during editing.  This behavior can be controlled by providing a `style` option to your vector layer and editing interactions.

First, we will import the required constructors:

```js
import {Style, Fill, Stroke} from 'ol/style';
```

## Static style

If we wanted to give all features the same style, we could configure our vector layer like this:

```js
const layer = new VectorLayer({
  source: source,
  style: new Style({
    fill: new Fill({
      color: 'red'
    }),
    stroke: new Stroke({
      color: 'white'
    })
  })
});
```

It is also possible to set the `style` property to an array of styles.  This allows rendering of a cased line (a wide stroke below and a narrower one on top), for example.

While there isn't really a good justification of it here, for the sake of this exercise we'll take advantage of *dynamic* styling.

## Dynamic style

When you want to make decisions about how each feature should get rendered based on something about the feature or the current view resolution, you can configure a vector layer with a style function.  This function gets called with each feature at each render frame, so it is important to write an efficient function if you have many features and want to maintain good rendering performance.

Here is an example that renders features using one of two styles depending on whether the "name" attribute starts with "A-M" or "N-Z" (a completely contrived example).

```js
const layer = new VectorLayer({
  source: source,
  style: function(feature, resolution) {
    const name = feature.get('name').toUpperCase();
    return name < "N" ? style1 : style2; // assuming these are created elsewhere
  }
});
```

## Styling based on geometry area

To see how dynamic styling works, we'll create a style function that renders features based on the geometry area.  To do this, we're going to make use of a [`colormap` package](https://www.npmjs.com/package/colormap) on npm.  We can add this to our dependencies like this:

    npm install colormap

Now, we need to import the `colormap` package and `ol/sphere` for spherical area calculations.

[import:'imports'](../../../src/en/examples/vector/style.js)

Next we'll write a couple functions to determine a color based on the area of a geometry:

[import:'color'](../../../src/en/examples/vector/style.js)

And now we can add a function that creates a style with a fill color based on the geometry area.  Set this function as the `style` property of your vector layer:

[import:'style'](../../../src/en/examples/vector/style.js)

![Features colored by area](style.png)
