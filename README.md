# OpenLayers Workshop

This doc is for people developing the OpenLayers Workshop.  Workshop participants work with archives downloaded from the [release pages](https://github.com/openlayers/workshop/releases).

## Building the workshop

Install Node 8+ and dependencies:

    npm install

Start the development server:

    npm start

The workshop content is divided into two directories.  The `doc` directory contains the documentation sources.  The `src` directory contains all of the sources that will be used by workshop participants (e.g. data, examples, etc.).  The build process creates an archive with the build version of the docs together with the `src` files.

When adding new pages or restructuring things, update the `doc/SUMMARY.md` (this is used to generate the content tree in the navigation).  Also update any of the nested `README.md` files (these provide the index page for each section).

## Creating a new release

When you push a new tag, Travis will build the workshop archive and attach it to the [release page](https://github.com/openlayers/workshop/releases).

In addition, you can update the [hosted version](http://openlayers.org/workshop/) of the workshop (this part is subject to change):

    npm run deploy

[![Current Status](https://travis-ci.org/openlayers/workshop.svg?branch=master)](https://travis-ci.org/openlayers/workshop)
