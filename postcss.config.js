module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-sort-media-queries')('desktop-first'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
}
