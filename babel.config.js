module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: 'current', // Para que use la versión de Node.js actual
      },
    }],
    '@babel/preset-react' // Para soportar JSX y React
  ],
};
