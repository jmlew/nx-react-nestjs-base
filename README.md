# ReactJS + NestJS Boilerplate Web App

A Base [ReactJS](https://reactjs.org) web app and [NestJS](https://docs.nestjs.com/) mock backend API server.

Organised as a [Nx](https://nx.dev) monorepo and composed using Domain Driven Design (DDD) principles to provides a best-practice starting point for developing modular and scaleable React apps.

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

## Code Structure

Use the below convenience methods to generate boilerplate code structure of the apps and libs.

### Generate a React library

`nx g lib <some-lib> --directory=<some-domain>/<lib-type> --tags='type:<lib-type>, domain:<some-domain>' --dry-run`

_Example: `nx g lib manage-users --directory=users/feature --tags='type:feature, domain:users'`_

## Storybook

Create storybook configs and storybook files for all components within a library.

Run `nx g @nrwl/react:storybook-configuration <project-name>` where <project-name> is
the name of the library in workspace.json.

Run all stories: `npm run storybook`.

## Development server

Run `npm start` to serve both the frontend `web-app` and mock API backend `mock-api` simultaneously.

Or run each separately using `npm run serve:web` for the frontend and `npm run serve:api` for the mock API backend.

- Navigate to `http://localhost:4200/` for the main frontend.
- Navigate to `http://localhost:3333/api/` for the mock API backend.

> NB: You may need to kill the port previously run by Node if an error persists which claims the port is still in use

- Web app server: `kill $(lsof -t -i:4200)`
- Mock API server: `kill $(lsof -t -i:3333)`

## Build

Run `npm run build` to build the project.
Run `npm run build:prod` to build the production-ready project.

### Serve Build files locally

Run `npm run serve:dist` to serve and test the built application which was generated using the BUILD command above using the `live-server` library. Navigate to `http://localhost:6600/`

## Understand your workspace

Run `npm run graph` to see a diagram of the dependencies of your projects.

## Updating React, NX, and project dependancies.

Run `nx migrate latest` then `nx migrate --run-migrations`. See [Updating Nx](https://nx.dev/using-nx/updating-nx).

## Recommended VSCode extensions

Find a list in .vscode/extensions.json to ensure the best development experience.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
