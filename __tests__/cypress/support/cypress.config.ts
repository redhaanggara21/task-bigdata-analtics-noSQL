import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    supportFile: false, // <-- Tambahkan baris ini
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});