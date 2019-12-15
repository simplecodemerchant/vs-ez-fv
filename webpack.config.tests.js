const path = require('path');

const config = {
  target: 'node', 

  entry: path.resolve(__dirname, 'test/tests.ts'), 
  output: {
    path: path.resolve(__dirname, 'dist_test'),
    filename: 'tests.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]'
  },
  externals: {
    vscode: 'commonjs vscode' 
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                  'module': 'es6'
              }
          }
          }
        ]
      }
    ]
  }
};
module.exports = config;