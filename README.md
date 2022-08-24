# ReactJS + NestJS Boilerplate Web App

A Base [ReactJS](https://reactjs.org) web app and [NestJS](https://docs.nestjs.com/) mock backend API server.

Organised as a [Nx](https://nx.dev) monorepo and composed using Domain Driven Design (DDD) principles to provides a best-practice starting point for developing modular and scaleable Angular apps.

## Architecture

The codebase combines a number of separate 'applications' (apps) and 'libraries' (libs) within the same workspace in a [NX Monorepo](https://nx.dev). There are only two applications:

1. Web-app

   > The main client application (ReactJS) as a simplified app with all functionality linked to in libs.

2. Mock-api
   > The Mock API server application (NestJS) which mocks interaction with teh real server during offline development.

## Features

### HTTP API request handling

The Web App (apps/web-app) uses [axios](https://github.com/axios/axios) to abstract common functionality around handling HTTP requests through the sample feature Axios API Service (UserAxiosApiService) class which is injected into the sample feature API Service (UserApiService) class to handle Axios configurations and common functionality.

Simple caching is included via the [axios-cache-adapter](https://github.com/RasCarlito/axios-cache-adapter) library and customised cache invalidation functionality is defined in UserAxiosApiService, applied via custom HTTP interceptors which are managed by the injected shared Axios interceptor service (AxiosApiInterceptorsService).

### HTTP request state management

A custom state manager class (ApiStateManager) provides an easy to use technique for updating and retrieving the current state of HTTP requests for use in containers which interact with APIs.

### NestJS Mock API app

The 'mock-api' app contains a NestJS application which replicates the APIs requested to ensure development can continue in parallel to that of the Backend. This mock API can be enabled as the source of all HTTP requests within the web-app when serving in dev mode and when the environments property `useMockInDev` is set to `true` (located in `src/environments/environment.ts`).

#### Serving the mock API

The app serves on the port defined in a variable in the .env file
(`process.env.NX_MOCK_API_PORT`) and this matches the port number defined in the web-app's
proxy file (`proxy.conf.json`), which is used to ensure all API calls within the app are
redirected to the mock API.

### Mock API testing

The codebase includes a Thunder Tests directory which contains configs for testing both
the NestJS APIs as well as some sample fake data APIs.
This uses the [Thunder
Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)
vscode extension listed in .vscode/extensions.json.

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

## Generate a framework agnostic shared library

Run `nx g @nrwl/workspace:library my-lib`

## Generate a shared library for React-specific components

Run `nx g @nrwl/react:lib my-lib`

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

## Recommended VSCode extensions

Find a list in .vscode/extensions.json to ensure the best development experience.
