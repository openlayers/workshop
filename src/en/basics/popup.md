# Showing a Popup on Feature Click

OpenLayers can anchor markup to a position on the map. This can be used to display a popup at a user clicked location. In this case, we just want to show the latitude and longitude of the current user location in a nice little popup.

## Working Example

The component that anchors markup to a position on the map is called `Overlay`. Let's import the module that provides the overlay:

[import:11-11](../examples/basics/popup.js)

For nice styling of the popup, we install `balloon-css` as additional dependency:

    npm install --save balloon-css

The css provided by this dependency has to be imported into our application:

[import:13-13](../examples/basics/popup.js)

For this balloon popup to work, we also need to add some markup to our `index.html`:

[import:21-23](../examples/basics/popup.html)

To create the overlay and connect it to the balloon popup, we append the following code to our `main.js`:

[import:41-](../examples/basics/popup.html)

The complete `index.html` and `main.js` files now looks like this:

[import](../examples/basics/popup.html)

[import](../examples/basics/popup.js)

### Tasks

1.  Copy the markup above and paste it into `index.html`.

1.  Copy the JS above and paste it into `main.js`.

1.  Look at the working map in your web browser: {{ book.workshopUrl }}. Once you are zoomed to your current location and see the blue circle, click on it to get the popup. When you click somewhere else on the map, the popup will disappear again.
