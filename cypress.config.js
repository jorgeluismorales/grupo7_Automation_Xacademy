const { defineConfig } = require("cypress");
const { allureCypress } = require('allure-cypress/reporter');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config);

      return config;
    },
    baseUrl: 'https://vps-3696213-x.dattaweb.com',
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false,
    modifyObstructiveCode: false,
    experimentalModifyObstructiveThirdPartyCode: true
  },
});
