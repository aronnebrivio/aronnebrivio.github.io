module.exports = {
  plugins: [
    require('cssnano')({
      preset: ['default', {
        discardUnused: false,
        colormin: false
      }]
    }),
  ],
};
