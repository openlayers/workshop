# OpenLayers Workshop

This doc is for people developing the OpenLayers Workshop.  Workshop participants see the main README.md.

## Prerequisites

 * [Node](https://nodejs.org/)
 * [GNU Make](https://www.gnu.org/software/make/)
 * [Sphinx](http://sphinx-doc.org/)

## Building the workshop

Install Node dependencies:

    npm install

Generate the workshop resources:

    make

Start the development server:

    npm start

## Publishing the workshop

Update the version number in `package.json`:

    npm version minor

Publish build artifacts to the npm registry (this will also run the default `make` target):

    npm publish
