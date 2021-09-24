# Deploying

Throughout the workshop, we've been using a development server to view the examples.  This is similar to the setup you would use when developing an application with the [`ol` package](https://www.npmjs.com/package/ol).  When you're ready to deploy your application, you'll want to create a minified bundle of your application entry point with a build step.

We've been using [parcel](https://parceljs.org/) for module bundling during development.  When we started the development server with `npm start`, we were running parcel in `development` mode.  In `production` mode, the bundle is minified.

To build assets for deployment, we run our `build` script from `package.json`:

    npm run build

This runs `parcel build index.html` and copies the `data` directory to the `dist/` folder.

After the build finishes, you'll have artifacts in the `dist` directory.  These are the assets that you would deploy to your production server (or S3, or wherever you want to host your application).  You can see what the app looks like by running a local http server.

    npx serve dist

Now you can open http://localhost:5000/ to see how the application will look in production.

That's it.  You're done!
