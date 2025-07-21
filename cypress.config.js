const { defineConfig } = require("cypress");
const {allureCypress} = require('allure-cypress/reporter');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureCypress(on, config);

      return config;
    },
    baseUrl: 'https://vps-3696213-x.dattaweb.com',
    defaultCommandTimeout: 6000
  },
});
