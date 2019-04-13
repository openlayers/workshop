# The VectorTile layer

We now know how to load tiled images, and we have seen different ways to load and render vector data. But what if we could have tiles that are fast to transfer to the browser, and can be styled on the fly? Well, this is what vector tiles were made for. OpenLayers supports vector tiles through the `VectorTile` layer.

## A world map rendered from vector data

We'll start with the same markup in `index.html` as in the [Basics](../basics/) exercise.

[import](../../../src/en/examples/vectortile/map.html)

As usual, we save `index.html` in the root of our workshop folder.

For the application, we'll start with a fresh `main.js` in the root of the workshop folder, and add the required imports:

[import:'imports'](../../../src/en/examples/vectortile/map.js)

The data source we are going to use requires an access key. Please read the terms at https://openmaptiles.com/hosting/, where you can also get your own key. The code below assigns the key to a constant we're going to use later:

```js
// See https://openmaptiles.com/hosting/ for terms and access key
const key = '<your-access-key-here>';
```

The map we're going to create here is the same that we have used in previous exercises:

[import:'map'](../../../src/en/examples/vectortile/map.js)

 The layer type we are going to use now is `VectorTileLayer`, with a `VectorTileSource`:

[import:'layer'](../../../src/en/examples/vectortile/map.js)

Our data source provides only zoom levels `0` to `14`, so we need to configure custom tile grid. Vector tile layers are usually optimized for a tile size of 512 pixels, which we also configured with the tile grid. The data provider also requires us to display some `attributions`.

As you can see, a `VectorTileSource` is configured with a `format` and a `url`, just like a `VectorLayer`. The `MVT` format parses Mapbox Vector Tiles. According to these format specifications, the tile data is accessed with XYZ information that must be specified in the URL. Therefore, they must include a zoom level (`{Z}`) and tile grid coordinates (`{X}` and `{Y}`).

The working example at {{book.workshopUrl}}/ shows an unstyled vector map like this:

![A world map without style](map.png)
