// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

import { worker } from '../../../src/mocks/browser'

Cypress.on('test:before:run:async', async () => {
  // if MSW wasnt started by the app, Cypress needs to start it
  await worker.start()
})

// Alternatively you can use CommonJS syntax:
// require('./commands')
