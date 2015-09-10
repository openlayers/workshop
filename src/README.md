# OpenLayers Workshop

Welcome to the **OpenLayers 3 Workshop**. This workshop is designed to give you a comprehensive overview of OpenLayers as a web mapping solution.

## Setup

These instructions assume that you are starting with an `openlayers-workshop.zip` archive from the latest [workshop release](https://github.com/openlayers/workshop/releases).  In addition, you'll need [Node](https://nodejs.org/) installed to run a development server for the OpenLayers library.

After extracting the zip, change into the `openlayers-workshop` directory and install some additional dependencies:

    npm install

Now you're ready to start the workshop server.  This serves up the workshop documentation in addition to providing a debug loader for the OpenLayers library.

    npm start

This will start a development server where you can read the workshop documentation and work through the exercises: {{ book.workshopUrl }}.

## Overview

This workshop is presented as a set of modules.  In each module you will perform a set of tasks designed to achieve a specific goal for that module.  Each module builds upon lessons learned in previous modules and is designed to iteratively build up your knowledge base.

The following modules will be covered in this workshop:

* [Basics](basics/README.md) - Learn how to add a map to a webpage with OpenLayers.
* [Layers and Sources](layers/README.md) - Learn about layers and sources.
* [Controls and Interactions](controls/README.md) - Learn about using map controls and interactions.
* [Vector Topics](vector/README.md) - Explore vector layers in depth.
* [Custom Builds](custom-builds/README.md) - Create custom builds.
