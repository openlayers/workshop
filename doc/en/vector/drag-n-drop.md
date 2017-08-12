# Drag and drop

For our feature editor, we want users to be able to import their own data for editing.  We'll use the `DragAndDrop` interaction for this.  As before, we'll stick with the GeoJSON format for parsing features, but the interaction can be configured to work with any number of feature formats.

Import the drag and drop interaction into your `main.js`:

[import:'import'](../../../src/en/examples/vector/drag-n-drop.js)

Next, we'll create a vector source with no initial data.  Instead of loading data from a remote location as in the previous example, this source will store features that the user drags and drops onto the map.

[import:'source'](../../../src/en/examples/vector/drag-n-drop.js)

Now rework the `layers` list in the map so we have one layer that uses our empty vector source:

[import:'layers'](../../../src/en/examples/vector/drag-n-drop.js)

Finally, we'll create a drag and drop interaction, configure it to work with our vector source, and add it to the map:

[import:'interaction'](../../../src/en/examples/vector/drag-n-drop.js)

Now you should be able to drag and drop GeoJSON files onto [the map]({{book.workshopUrl}}) and see them rendered.

![Drag and drop](drag-n-drop.png)
