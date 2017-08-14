# Modifying features

Now that we have a way for users to load data into the editor, we want to let them edit features.  We'll use the `Modify` interaction for this, configuring it to modify features on our vector source.

First, import the `Modify` interaction in your `main.js`:

[import:'import-modify'](../../../src/en/examples/vector/modify.js)

Next, create a new interaction connected to the vector source and add it to the map (at the bottom of `main.js`):

[import:'modify'](../../../src/en/examples/vector/modify.js)

After adding data to [the map]({{book.workshopUrl}}/) confirm that you can modify features by dragging their vertices.  You can also delete vertices with `Alt+Click`.

![Modifying features](modify.png)
