# Zooming to Your Location

Browsers provide an API to get the current location of the user. We want to use this feature to zoom the map to where the user currently is. To make it easier for the user to see what is going on on the map, we want to animate the zoom.

## Application Changes

First of all, we need to assign the map to a constant, so we can access it from other components we're going to add in this exercise:

[import:'map-const'](../../../src/en/examples/basics/geolocation.js)

To add the geolocation functionality, we append a short code block to our `main.js` file:

[import:'geolocation'](../../../src/en/examples/basics/geolocation.js)

This requires a new import for the `proj.fromLonLat()` function, which converts longitude/latitude coordinates into the coordinate system OpenLayers uses by default for the map view (Web Mercator, EPSG:3857).

[import:'import-proj'](../../../src/en/examples/basics/geolocation.js)

### View the Result

When we look at the map in the web browser ({{book.workshopUrl}}/), we will probably get asked whether we want to give the page access to our location. After answering 'Yes', an animated zoom should take us to our current location.
