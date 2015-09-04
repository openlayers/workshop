/**
 * This script starts a dev server that provides a script loader for the
 * OpenLayers library at the /loader.js path and serves files from the dist
 * directory for all other paths.
 */

var fork = require('child_process').fork;
var fs = require('fs');
var path = require('path');

var inCss = path.join(__dirname, 'node_modules', 'openlayers', 'css', 'ol.css');
var outCss = path.join(__dirname, 'ol.css');
fs.createReadStream(inCss).pipe(fs.createWriteStream(outCss));

var child = fork(
  path.join(__dirname, 'node_modules', 'openlayers', 'tasks', 'serve-lib.js'),
  ['--port', '4000'],
  {cwd: path.join(__dirname), silent: true}
);

var out = '';
child.stderr.on('data', function(data) {
  var match = String(data).match(/server running (.*)loader.js/);
  if (match) {
    process.stdout.write('Server running: ' + match[1] + '\n');
  }
  out += data;
});

child.on('close', function(code) {
  if (code !== 0) {
    process.stderr.write(out + '\n');
    process.stderr.write('The debug server failed\n');
    process.exit(1);
  } else {
    process.exit(0);
  }
});
