# Showing a Popup on Feature Click

OpenLayers can anchor markup to a position on the map. This can be used to display a popup at a user clicked location. In this case, we just want to show the latitude and longitude of the current user location in a nice little popup.

## Working Example

For nice styling of the popup, we can go to http://www.cssarrowplease.com and design a container for our popup. The resulting css is simply copied to the `<style>` section of our index.html:

[import:'css'](../../../src/en/examples/basics/popup.html)

To make the popup look nicer, we give the `.arrow-box` some padding and rounded corners:

[import:'nicer-css'](../../../src/en/examples/basics/popup.html)

In addition to the css, we also need to add the markup for the container the body of our `index.html`:

[import:'markup'](../../../src/en/examples/basics/popup.html)

To create the overlay and connect it to the popup, we append the following code to our `main.js`:

[import:'popup'](../../../src/en/examples/basics/popup.js)

Note the `offset` we configured for the `Overlay`. The y offset (`-10`) has to compensate for the arrow size we provided on http://www.cssarrowplease.com.

The complete `index.html` and `main.js` files now looks like this:

[import](../../../src/en/examples/basics/popup.html)

[import](../../../src/en/examples/basics/popup.js)

### Tasks

1.  Copy the markup above and paste it into `index.html`.

1.  Copy the JS above and paste it into `main.js`.

1.  Look at the working map in your web browser: {{ book.workshopUrl }}. Once you are zoomed to your current location and see the blue circle, click on it to get the popup. When you click somewhere else on the map, the popup will disappear again.

![A map with a popup at our location](popup.png)
