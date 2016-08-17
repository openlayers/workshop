# OpenLayers Workshop

This doc is for people developing the OpenLayers Workshop.  Workshop participants work with archives downloaded from the [release pages](https://github.com/openlayers/workshop/releases).

## Building the workshop

Install Node dependencies:

    npm install

Start the development server:

    npm start

Now you can modify the `src` content.  When adding new pages or restructuring things, update the `src/SUMMARY.md` (this is used to generate the content tree in the navigation).  Also update any of the nested `README.md` files (these provide the index page for each section).

## Updating the workshop with a new release of OpenLayers

To update the workshop with a new release of OpenLayers one needs to change the version number of the `openlayers` dependency in three places:

* Top level `package.json`,
* English workshop `src/en/package.json` and
* French workshop `src/fr/package.json`

## Creating a new release

When you push a new tag, Travis will build the workshop archive and attach it to the [release page](https://github.com/openlayers/workshop/releases).

In addition, you can update the [hosted version](http://openlayers.org/workshop/) of the workshop (this part is subject to change):

    npm run deploy

[![Current Status](https://travis-ci.org/openlayers/workshop.svg?branch=master)](https://travis-ci.org/openlayers/workshop)
