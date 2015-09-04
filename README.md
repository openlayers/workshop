# OpenLayers Workshop

This doc is for people developing the OpenLayers Workshop.  Workshop participants work with archives downloaded from the [release pages](https://github.com/openlayers/workshop/releases).

## Prerequisites

 * [Node](https://nodejs.org/)

## Building the workshop

Install Node dependencies:

    npm install

Start the development server:

    npm start

Now you can modify the `src` content.  When adding new pages or restructuring things, update the `src/SUMMARY.md` (this is used to generate the content tree in the navigation).  Also update any of the nested `README.md` files (these provide the index page for each section).

## Creating a new release

First, confirm the release archive works as expected:

    npm run archive

Extract the resulting `build/openlayers-workshop.zip` archive, and make sure the instructions will work for workshop participants.  After confirming things work as expected, create a tag and push it.  Travis will create an archive and attach it to the GitHub release page.

In addition, you can update the [hosted version](http://openlayers.org/workshop/) of the workshop (this part is subject to change):

    npm run deploy

[![Current Status](https://travis-ci.org/openlayers/workshop.svg?branch=master)](https://travis-ci.org/openlayers/workshop)
