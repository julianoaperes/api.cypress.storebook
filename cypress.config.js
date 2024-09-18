const { defineConfig } = require("cypress");

const { configurePlugin } = require("cypress-mongodb");

module.exports = defineConfig({
  env: {
    mongodb: {
      uri: "mongodb+srv://dba:jpsdet@storebookapi.pcevz.mongodb.net/?retryWrites=true&w=majority&appName=StoreBookApi",
      database: "test",
      collection: "livros",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      configurePlugin(on);
    },
  },
});
