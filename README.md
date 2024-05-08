# Alexandria Frontend

## Setting Up

### Locally
- Install [Node.js v20.12.2](https://nodejs.org/en/download)
  - You can check it's installed by running `node -v` on a terminal
- Install [npm LTS](https://github.com/npm/cli/releases) *tip: Node.js might install this automatically*
  - You can check it's installed by running `npm -v` on a terminal
- Open the project's root folder on a terminal (if you run `ls` you should see a file called `package.json`) 
- Run `npm install` to install the project's dependencies
  - There should now be a folder called `node_modules` in the project' root folder

### Using Docker
- Install [Docker](https://www.docker.com/products/docker-desktop/)
- Optional: To enable hot-reloading, add the following lines to the [nextConfig](/next-env.d.ts) *tip: they should already be there, commented out*
```javascript
webpack: config => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        }
        return config
    }
```
Note that it can take up to a second after changes are saved for a reload to happen when using Docker.

### VSCode
Optional: Enable auto-formatting in the followed code style.
- Install the VSCode extension [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- In VSCode settings, 
  - set **Editor: Default Formatter** to **Prettier - Code formatter**
  - set **Editor: Format on Save** to **true**

## Developing

### Project structure
Most files in project root are configuration files, and should (mostly) be left untouched.

After correct set up, building, running, and running tests for the first time, the following folders will be present:
- `__tests__` - [Jest](https://jestjs.io/) unit tests
- `.next` - project build
- `coverage` - Jest coverage reports
- `cypress` - [Cypress](https://www.cypress.io/) configuration files
  - `cypress/component` - Cypress component tests
  - `cypress/e2e` - Cypress end to end tests
- `node_modules` - Node packages (i.e. project dependencies). See also [package.json](https://www.geeksforgeeks.org/node-js-package-json/)
- `public` - [static assets](https://nextjs.org/docs/pages/building-your-application/optimizing/static-assets)
- **`app` - source code to build the website with Next.js**. Each folder subfolder in here becomes a route (e.g. `app/about` -> `https://domain.com/about`) if there's a file called `page.tsx` in it (see [Next.js routing](https://nextjs.org/docs/app/building-your-application/routing) for more information). We follow the [Project organization strategy of Split project files by feature](https://nextjs.org/docs/app/building-your-application/routing/colocation#split-project-files-by-feature-or-route).

### Run the website

With Node.js (locally), run
```bash
npm run dev
```

With Docker, run
```bash
docker-compose up dev
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the website. The website should auto-update as you change the source files (see [Docker setup](#using-docker) if you're using Docker).

### Testing

#### Unit tests

Unit tests are written using Jest.

Place them in the folder `/__tests__`, with the file naming convention `name.test.tsx`.

You can run them with `npm run test`, or [using Docker](#docker).

After running, coverage reports will be written to `/coverage`.

See [Jest docs](https://jestjs.io/docs/getting-started) for more details.

#### Component and end to end tests

Component and end to end tests are written using Cypress.

Place component tests in the folder `/cypress/component`, place end to end tests in the folder `/cypress/e2e`. The naming convention for both is `name.cy.tsx`.

You can use `npm run` followed by one of the following to run them: 
- `cypress:open` - Opens a GUI to run Cypress tests *tip: a development server must be running for you to run e2e tests*
- `component` - Opens a GUI to run component tests
- `component:headless` - Runs all component tests and shows report in CLI
- `e2e` - Initializes a development server and opens a GUI to run e2e tests
- `e2e:headless` - Initializes a development server and runs all e2e tests and shows report in CLI
or [using Docker](#docker).

After running, you may find screenshots of what went wrong in the folder `/cypress/screenshots`.

See [Cypress docs](https://docs.cypress.io/guides/overview/why-cypress) for more details.

### Static analysis

Linting is enforced with ESLint and code style with prettier. You can use the following commands to run static analysis on your code:
- `npm run lint` - Lints and generates a report
- `npm run format` - Checks code style and automatically fixes issues
- `npm run format:check` - Checks code style and generates a report

See also [VSCode setup](#vscode) to enable auto code formatting on VSCode.

### Scripts

#### NPM

The following words can replace `<KEYWORD>` in the command `npm run <KEYWORD>`:
- `dev` - Starts development server
- `build` - Builds an optimized version of website
- `start` - Starts server on built project
- `lint`, `format`, `format:check` - See [Static analysis](#static-analysis)
- `test`, `test:watch` - See [Unit tests](#unit-tests)
- `cypress:open`, `e2e`, `e2e:headless`, `component`, `component:headless` - See [Component and end to end tests](#component-and-end-to-end-tests)

#### Docker

You can run any of the NPM scripts on your Docker container by opening up the container's terminal.

Additionally, you can run the following commands to open containers for testing without running the development server:
```bash
docker-compose up test
docker-compose up e2e
```
`test` runs Jest unit tests and the linter, while `e2e` runs cypress end to end tests.

### Learn more

#### React
- [Next.js' 'React foundations'](https://nextjs.org/learn/react-foundations) - "This beginner-friendly, example-led course will guide you through the prerequisite knowledge for Next.js" (i.e. React itself)
- [React docs' quick start](https://react.dev/learn) - "This page will give you an introduction to the 80% of React concepts that you will use on a daily basis."
- [React doc's 'Thinking in React'](https://react.dev/learn/thinking-in-react) - Good resource on how to think about React code and it's structure

#### Next.js
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

#### CSS
- Framework used in the project: [Tailwind CSS](https://tailwindcss.com/) - a utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center` and `rotate-90` that can be composed to build any design, directly in your markup.
- Bare CSS: [Learn CSS](https://web.dev/learn/css/)

#### Tests

- Unit tests: [Jest](https://jestjs.io/docs/getting-started)
- Component and end-to-end tests: [Cypress](https://docs.cypress.io/guides/overview/why-cypress)
  