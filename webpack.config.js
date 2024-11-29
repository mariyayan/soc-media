
const path = require("path");

module.exports = {
	entry: "./src/index.js",
	mode: "development",
	output: {
    filename: "../public/main.js"
  },
   
    module: {
    rules: [
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.(js)$/, use: 'babel-loader' },
    {
      test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env','@babel/preset-react'] },
    }
    ]
  },
}