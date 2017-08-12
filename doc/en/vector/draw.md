# Drawing new features

Our feature editor can now be used for loading data and modifying features.  Next up, we'll add a `Draw` interaction to allow people to draw new features and add them to our source.

First, import the `Draw` interaction (in `main.js`):

[import:'import-draw'](../../../src/en/examples/vector/draw.js)

We'll also import the `GeometryType` constants:

[import:'import-types'](../../../src/en/examples/vector/draw.js)

Now, create a draw interaction configured to draw polygons and add them to our vector source:

[import:'draw'](../../../src/en/examples/vector/draw.js)

(Note that we could have used `type: 'Polygon'` in place of `type: GeometryType.POLYGON` when configuring the interaction.)