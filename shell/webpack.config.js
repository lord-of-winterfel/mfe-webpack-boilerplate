const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const port = 3000;

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      publicPath: 'auto',
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: { loader: 'ts-loader', options: { transpileOnly: true } },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        title: 'Luna UI',
      }),
      new ModuleFederationPlugin({
        name: 'shell',
        remotes: {
          remoteLibrary: `remoteLibrary@http://localhost:3001/remoteEntry.js`,
          remoteBlog: `remoteBlog@http://localhost:3002/remoteEntry.js`,
        },
        shared: {
          react: { singleton: true, requiredVersion: '^19.0.0' },
          'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
          'react-router-dom': { singleton: true, requiredVersion: '^6.22.0' },
          'mfe-react-component-library': { singleton: true, requiredVersion: '^1.0.0' },
        },
      }),
    ],
    devServer: {
      port,
      historyApiFallback: true,
      hot: true,
      headers: { 'Access-Control-Allow-Origin': '*' },
    },
    devtool: isProd ? false : 'eval-cheap-module-source-map',
  };
};
