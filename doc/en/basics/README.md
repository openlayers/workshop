# Basics

Make sure you've completed the [setup instructions](../) to install dependencies and get the development server running.

Now that we have set up our development environment, let's get started by creating a simple web page with an  OpenLayers map, and understand the code.

In OpenLayers, a map is a collection of layers that get rendered to a web page.  To create a map, you need some markup (HTML) that creates the map viewport (e.g. a `<div>` element), a bit of style to give the map viewport the appropriate dimensions on your page, and map initialization code.

## The markup

First, we create an `index.html` file in the root of the workshop directory:

[import](../../../src/en/examples/basics/map.html)

Note that we do not need to include any `<script>` for our application. Our webpack setup takes care of that. Our `<style>` makes the map container fill the whole page, and we will use the container `<div>` with the `map-container` id as target for the map.

## The application

To work with OpenLayers, we install the [`ol` package](https://www.npmjs.com/package/ol) from npm. This was already done in the previous `npm install` step.  If you were starting from scratch on a new application, you would run this in the terminal:

    npm install ol@beta

As entry point of the application, we create a `main.js` file, and also save it in the root of the workshop directory:

[import](../../../src/en/examples/basics/map.js)

At the top, we import the required modules from the `ol` package. Note the `'ol/ol.css'` import, which adds the styles that OpenLayers requires for its basic UI components. With everything we need imported, we move on and create a `Map`. The `target` points to the container `<div>` we have in our markup. We configure the map with a tiled image layer (`TileLayer`) and an `XYZSource`. Finally, the `View` defines the initial `zoom` and `center`. To provide geographic coordinates, we use the `fromLonLat` helper function from the `ol/proj` module.

## Viewing the map

Now our application is ready for testing. Let's open the working map in a web browser: {{book.workshopUrl}}/. This is how it should look:

![A map of the world](map.png)

## Further reading

In the [final chapter](../deploying/) of the workshop, we will learn how create a production build of the application for deployment.
