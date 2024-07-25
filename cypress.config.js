const { defineConfig } = require('cypress');

module.exports = defineConfig({
  defaultCommandTimeout:8000,
  "waitForFileChanges":true,
  //reporter: 'cypress-mochawesome-reporter',//
  "reporter":"mochawesome",
  "reporterOptions":{
      "charts":true,
      "overwrite":false,
      "html":false,
      "json":true,
      "reportDir":"cypress/reports"
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});