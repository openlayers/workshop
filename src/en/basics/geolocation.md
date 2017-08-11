# Zooming to Your Location

Browsers provide an API to get the current location of the user. We want to use this feature to zoom the map to where the user currently is. To make it easier for the user to see what is going on on the map, we want to animate the zoom.

## Working Example

To add this functionality, we append a short code block to our `main.js` file:

[import:'geolocation'](../examples/basics/geolocation.js)

This requires a new import for the `proj.fromLonLat()` function, which converts longitude/latitude coordinates into the coordinate system OpenLayers uses by default for the map view (Web Mercator, EPSG:3857).

[import:'import'](../examples/basics/geolocation.js)


### Tasks

1.  Copy the JS snippets above and paste them into `main.js`. Insert the `import` at the top of the file, and append the rest at the bottom.

1.  Look at the working map in your web browser: {{ book.workshopUrl }}. When asked whether you want to give the page access to your location, answer 'Yes'.
