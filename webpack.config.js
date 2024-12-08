const path = require('path');

module.exports = {
  entry: './js/scripts.js',  // Path to your main JS file
  output: {
    filename: 'scripts.min.js',  // Output filename
    path: path.resolve(__dirname, 'dist/js'),  // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/,  // Apply Babel to all .js files
        exclude: /node_modules/,  // Do not process files in node_modules
        use: {
          loader: 'babel-loader',  // Use babel-loader
          options: {
            presets: ['@babel/preset-env'],  // Use the @babel/preset-env preset
          },
        },
      },
      {
        test: /\.scss$/,  // Apply sass-loader to all .scss files
        use: [
          'style-loader',  // Injects styles into the DOM
          'css-loader',    // Translates CSS into CommonJS
          'sass-loader',   // Compiles SCSS to CSS
        ],
      },
    ],
  },
  mode: 'production',  // Minify the code in production mode
};
