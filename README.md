# ReactJS + NestJS Boilerplate Web App

A Base [ReactJS](https://reactjs.org) web app and [NestJS](https://docs.nestjs.com/) mock backend API server.

Organised as a [Nx](https://nx.dev) monorepo with shared libraries containing common API models and utils.

Provides a best practice starting point for developing scaleable ReactJS web apps.

## Architecture

The app's architecture aligns with the semantics and directory structure as defined in [this guide](http://bit.ly/scaleable-apps).

### Monorepo

The codebase is combined into a number of separate 'applications' and 'libraries' in a [NX Monorepo](https://nx.dev).

### HTTP API Playground

The codebase includes an HTTP Playground to test endpoint responses inside 'http-playground'.
This uses the humao.rest-client vscode extension listed in .vscode/extensions.json with dependant global API variables defined in .vscode/settings.json 'rest-client.environmentVariables'.

## Recommended VSCode extensions

Find a list in .vscode/extensions.json to ensure the best development experience.

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate a new React application

Run `nx g @nrwl/react:app my-app`

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

Libraries are shareable across libraries and applications. Their absolute paths are added
to tsconfig.base.json and should be altered according to their usecase.

## Generate a shared React library

Run `nx g @nrwl/react:lib my-lib`

## Generate a framework agnostic shared library

Run `nx g @nrwl/workspace:library my-lib`

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
