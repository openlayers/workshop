# Deploying

Throughout the workshop, we've been using a development server to view the examples.  This is similar to the setup you would use when developing an application with the [`ol` package](https://www.npmjs.com/package/ol).  When you're ready to deploy your application, you'll want to create a minified bundle of your application entry point with a build step.

We've been using [webpack](https://webpack.js.org/) for module bundling during development.  The `webpack.config.js` at the root of the workshop directory includes webpack configuration profiles for `dev` and `prod` environments.  When we started the development server with `npm start`, we were using the `dev` profile.  The `prod` profile adds two webpack plugins: the [`EnvironmentPlugin`](https://webpack.js.org/plugins/environment-plugin/) and the [`BabiliPlugin`](https://github.com/webpack-contrib/babel-minify-webpack-plugin).  This provides a good starting point for your `prod` build profile.  Explore the other [webpack plugins](https://webpack.js.org/plugins/) to see what else you might want to bring in.

To build assets for deployment, we run our `build` script from `package.json`:

    npm run build

This runs `webpack --env=prod`, but doesn't require that `webpack` is on our path.

After the build finishes, you'll have artifacts in the `build` directory.  These are the assets that you would deploy to your production server (or S3, or wherever you want to host your application).  You can see what the app looks like by opening the `index.html` file in your browser.

    open build/index.html

That's it.  You're done!
