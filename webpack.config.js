const path = require('path');

module.exports = {
  entry: {
    cart: './src/ts/cart.ts',
    categories: './src/ts/categories.ts',
    products: './src/ts/products.ts'
  },  
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'src/dist'),
    filename: '[name].js',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js']   
  },
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [ 
              '@babel/preset-env',
              "@babel/preset-typescript"
            ]
          }
        }
      }
    ],
  },
};