# Meteorites!

TODO: words

First, edit your `index.html` so we're ready to render a full page map:

[import](../../../src/en/examples/webgl/meteorites.html)

As a first pass, we'll use a normal vector layer.  Update your `main.js` to load and render a local CSV file with data representing meteorite impacts:

[import](../../../src/en/examples/webgl/meteorites.js)

After fetching the data with an `XMLHttpClient`, a feature is created for each line in the CSV file and added to a vector source.  This source is rendered in a vector layer over a tile layer.

TODO: screenshot
