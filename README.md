# OpenLayers Workshop

This doc is for people developing the OpenLayers Workshop.  Workshop participants work with archives downloaded from the [release pages](https://github.com/openlayers/workshop/releases).

## Building the workshop

Install Node 16+ and dependencies:

    npm install

Start the development server:

    npm start

The workshop content is divided into two directories.  The `doc` directory contains the documentation sources.  The `src` directory contains all of the sources that will be used by workshop participants (e.g. data, examples, etc.).  The build process creates an archive with the build version of the docs together with the `src` files.

When adding new pages or restructuring things, update the `doc/SUMMARY.md` (this is used to generate the content tree in the navigation).  Also update any of the nested `README.md` files (these provide the index page for each section).

## Creating a new release

Create a new tag and update the version in `package.json`.  This can be done together with the following:

    npm version v6.8.1-en.3

Choose a major, minor, and patch version that matches the `ol` release version.  Increment the prerelease identifier to be higher than whatever was published last.  Then push the changes to `package.json` and the new tag:

    git push --tags origin main

This will results in a new `release` job in GitLab CI.  The workshop archive will be built and attached to the new release.

On every push to the `main` branch, the `gh-pages` branch is updated with a `deploy` job in GitLab CI.

![Current Status](https://github.com/openlayers/workshop/actions/workflows/deploy.yml/badge.svg)
