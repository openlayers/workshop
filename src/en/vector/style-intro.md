# Understanding Style

When styling HTML elements, you might use CSS like the following:

```css
  .someClass {
    background-color: blue;
    border-width: 1px;
    border-color: olive;
  }
```

The `.someClass` text is a selector (in this case it selects all elements that include the class name `'someClass'`) and the block that follows is a group of named properties and values, otherwise known as style declarations.

## Layer style

A vector layer can have styles. More specifically, a vector layer can be configured with an `ol.style.Style` object, an array of `ol.style.Style` objects, or a function that takes an `ol.Feature` instance and a resolution and returns an array of `ol.style.Style` objects.

Here's an example of a vector layer configured with a static style:

```js
  var layer = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: new ol.style.Style({
      // ...
    })
  });
```

And here's an example of a vector layer configured with a style function that applies a style to all features that have an attribute named `class` with a value of `'someClass'`:

```js
  var layer = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: function(feature, resolution) {
      if (feature.get('class') === 'someClass') {
        // create styles...
        return styles;
      }
    },
  });
```

## Symbolizers

The equivalent of a declaration block in CSS is a `symbolizer` in OpenLayers 3 (these are typically instances of `ol.style` classes). To paint polygon features with a blue background and a 1 pixel wide olive stroke, you would use two symbolizers like the following:

```js
  new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'blue'
    }),
    stroke: new ol.style.Stroke({
      color: 'olive',
      width: 1
    })
  });
```

Depending on the geometry type, different symbolizers can be applied. Lines work like polygons, but they cannot have a fill. Points can be styled with `ol.style.Circle` or `ol.style.Icon`. The former is used to render circle shapes, and the latter uses graphics from file (e.g. png images). Here is an example for a style with a circle:

```js
  new ol.style.Circle({
    radius: 20,
    fill: new ol.style.Fill({
      color: '#ff9900',
      opacity: 0.6
    }),
    stroke: new ol.style.Stroke({
      color: '#ffcc00',
      opacity: 0.4
    })
  });
```

## `ol.style.Style`

An `ol.style.Style` object has 4 keys: `fill`, `image`, `stroke` and `text`. It also has an optional `zIndex` property. The style function will return an array of `ol.style.Style` objects.

If you want all features to be colored red except for those that have a `class` attribute with the value of `"someClass"` (and you want those features colored blue with an 1px wide olive stroke), you would create a style function that looked like the following (by the way, it is important to create objects outside of the style function so they can be reused, but for simplicity reasons the objects are created inline in the example below):

```js
  var primaryStyle = new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'blue'
    }),
    stroke: new ol.style.Stroke({
      color: 'olive',
      width: 1
    })
  });

  var otherStyle = new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'red'
    })
  });

  layer.setStyle(function(feature, resolution) {
    if (feature.get('class') === 'someClass') {
      return primaryStyle;
    } else {
      return otherStyle;
    }    
  });
```

*Note* - It is important to create the styles outside of the actual style function.  The style function is called many times during rendering, and you'll get smoother animation if your style functions don't create a lot of garbage.

A feature also has a style config option that can take a function having only resolution as argument. This makes it possible to style individual features (based on resolution).

## Pseudo-classes

CSS allows for pseudo-classes on selectors. These basically limit the application of style declarations based on contexts that are not easily represented in the selector, such as mouse position, neighboring elements, or browser history. In OpenLayers 3, a somewhat similar concept is having a style config option on an `ol.interaction.Select`.

An example is:

```js
  var select = new ol.interaction.Select({
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255,255,255,0.5)'
      })
    })
  });
```

With the basics of styling under your belt, it's time to move on to [styling vector layers](style.md).
