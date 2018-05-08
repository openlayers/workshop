# Deploying

Throughout the workshop, we've been using a development server to view the examples.  This is similar to the setup you would use when developing an application with the [`ol` package](https://www.npmjs.com/package/ol).  When you're ready to deploy your application, you'll want to create a minified bundle of your application entry point with a build step.

We've been using [webpack](https://webpack.js.org/) for module bundling during development.  The `webpack.config.js` at the root of the workshop directory includes our webpack configuration profile.  When we started the development server with `npm start`, we were running webpack in `development` mode.  In `production` mode, the bundle is minified.  This provides a good starting point for your webpack configuration.  Explore the other [webpack plugins](https://webpack.js.org/plugins/) to see what else you might want to bring in.

To build assets for deployment, we run our `build` script from `package.json`:

    npm run build

This runs `webpack --mode=production`, but doesn't require that `webpack` is on our path.

After the build finishes, you'll have artifacts in the `build` directory.  These are the assets that you would deploy to your production server (or S3, or wherever you want to host your application).  You can see what the app looks like by opening the `index.html` file in your browser.

    open build/index.html

That's it.  You're done!
