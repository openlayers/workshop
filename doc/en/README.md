# OpenLayers Workshop

Welcome to the **OpenLayers Workshop**. This workshop is designed to give you a comprehensive overview of OpenLayers as a web mapping solution.

## Setup

These instructions assume that you are starting with an `openlayers-workshop-en.zip` archive from the latest [workshop release](https://github.com/openlayers/workshop/releases).  In addition, you'll need [Node](https://nodejs.org/) v16 or higher installed to run a development server for the workshop.

After extracting the zip, change into the `openlayers-workshop-en` directory and install some additional dependencies:

    npm install

Now you're ready to start the workshop development server.  This serves up the [workshop documentation]({{book.workshopUrl}}/doc/) in addition to providing a module bundler for the OpenLayers library.

    npm start

This will start a development server where you can read the workshop documentation and work through the exercises.  You should be able to confirm that things are working by seeing an alert pop up at {{book.workshopUrl}}/.  You can read through the workshop documentation at {{book.workshopUrl}}/doc/.

## Overview

This workshop is presented as a set of modules.  In each module you will perform tasks designed to achieve a specific goal for that module.  Each module builds upon lessons learned in previous modules and is designed to iteratively build up your knowledge base.

The following modules will be covered in this workshop:

* [Basics](basics/README.md) - Learn how to add a map to a webpage.
* [Vector Data](vector/README.md) - Working with vector data.
* [Mobile Maps and Sensors](mobile/README.md) - Mobile maps with GPS and compass.
* [GeoTIFF Rendering](cog/README.md) - Generate and visualize data tiles from GeoTIFF sources.
* [Vector Tiles and Mapbox Styles](vectortile/README.md) - Create beautiful maps with vector tiles.
* [WebGL Point Rendering](webgl/README.md) - Render points with WebGL.
* [Deploying](deploying/README.md) - Building applications for production.
