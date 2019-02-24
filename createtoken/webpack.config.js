const webpack = require('webpack');
const path = require('path');
module.exports = {
  entry: __dirname + "/public/test_moudle/hello.js",
  output: {
    path: __dirname + "/build",
    filename: 'hello.js'
  },
};
