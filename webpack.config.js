const path = require('path');

/** @type { import('webpack').Configuration } */
const config = {
  entry: {
    extension: './src/extension',
  },
  target: 'node',
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      }
    ]
  },
  devtool: 'source-map',
}

module.exports  = config;