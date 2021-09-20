const serveStatic = require('serve-static');

module.exports = function (app) {
  app.use('/data/', serveStatic('data'));
  app.use('/doc/', serveStatic('doc'));
  app.use('/gitbook/', serveStatic('gitbook'));
};
