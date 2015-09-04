# OpenLayers Workshop

This doc is for people developing the OpenLayers Workshop.  Workshop participants work with archives downloaded from the release pages.

## Prerequisites

 * [Node](https://nodejs.org/)

## Building the workshop

Install Node dependencies:

    npm install

Start the development server:

    npm start

Create a release archive:

    npm run archive

## Creating a new release

After confirming that the archive created above (`openlayers-workshop.zip`) works as expected, create a tag and push it.  Travis will create an archive and attach it to the GitHub release page.

## Publishing the workshop

Update the hosted version of the website:

    npm run deploy
