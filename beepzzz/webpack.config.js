module.exports = {
    module: {
      rules: [
        {
          test: /\.jsx?$/, // Handle JS and JSX files
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.css$/, // Handle CSS files
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  };
  