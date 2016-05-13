# OpenLayers Resources

The OpenLayers library contains a wealth of functionality. Though the developers have worked hard to provide examples of that functionality and have organized the code in a way that allows other experienced developers to find their way around, many users find it a challenge to get started from scratch.

## Learn by Example

New users will most likely find diving into the OpenLayer's example code and experimenting with the library's possible functionality the most useful way to begin.

* http://openlayers.org/en/master/examples/

## Browse the Documentation

For further information on specific topics, browse the growing collection of OpenLayers  documentation.

* http://openlayers.org/en/master/doc/quickstart.html
* http://openlayers.org/en/master/doc/tutorials

## Find the API Reference

After understanding the basic components that make-up and control a map, search the API reference documentation for details on method signatures and object properties. If you only want to see the stable part of the API, make sure to check the `Stable Only` checkbox.

* http://openlayers.org/en/master/apidoc/

## Join the Community

OpenLayers is supported and maintained by a community of developers and users like you. Whether you have questions to ask or code to contribute, you can get involved by using the `openlayers-3` tag on StackOverflow for usage questions or signing up for the developers mailing list.

* http://stackoverflow.com/questions/tagged/openlayers-3
* https://groups.google.com/forum/#!forum/ol3-dev

## Reporting issues

For reporting issues it is important to understand the several flavours in which the OpenLayers library is distributed:

* `ol.js` - the script which is built using the Closure Compiler in advanced mode (not human readable)
* `ol-debug.js` - human readable version to be used during development

When you encounter an issue, it is important to report the issue using `ol-debug.js`. Also include the full stack trace which you can find using Web Developer tools such as Chrome's Developer Tools. To test this out we are going to make a mistake in map.html by changing `ol.layer.Tile` into `ol.layer.Image`. The error you will see is: `Uncaught TypeError: undefined is not a function`. If you report this to the mailing list, nobody will know what it means. So first, we are going to change the script tag which points to `ol.js` to point to `ol-debug.js` instead. Reload the page. The debugger will now stop on the error, and we can see the full stack trace.

![At a breakpoint in the debugger](debugger.png)
