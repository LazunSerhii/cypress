const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'electron') {
          launchOptions.args.push('--disable-gpu')
          launchOptions.args.push('--disable-dev-shm-usage')
          launchOptions.args.push('--no-sandbox')
          launchOptions.args.push('--disable-setuid-sandbox')
          launchOptions.args.push('--disable-software-rasterizer')
        }
        return launchOptions
      })
    },
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 60000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    retries: {
      runMode: 1,
      openMode: 0
    }
  }
})
