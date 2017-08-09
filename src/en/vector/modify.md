# Modifying features

Now that we have a way for users to load data into the editor, we want to let them edit features.  We'll use the `Modify` interaction for this, configuring it to modify features on our vector source.

First, import the `Modify` interaction in your `main.js`:

[import:5-5](../examples/vector/modify.js)

Next, create a new interaction connected to the vector source and add it to the map (at the bottom of `main.js`):

[import:35-35](../examples/vector/modify.js)
