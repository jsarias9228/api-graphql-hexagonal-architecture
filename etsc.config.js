module.exports = {
  // Supports all esbuild.build options
  esbuild: {
    minify: false,
    target: 'esnext'
  },
  // Prebuild hook
  prebuild: async () => {
    const rimraf = (await import('rimraf')).rimrafSync
    rimraf('./dist') // clean up dist folder
  },
  // Postbuild hook
  postbuild: async () => {
    const cpy = (await import('cpy')).default
    await cpy(
      [
        'src/**/*.graphql', // Copy all .graphql files
        '!src/**/*.{tsx,ts,js,jsx}' // Ignore already built files
      ],
      'dist'
    )
  }
}
