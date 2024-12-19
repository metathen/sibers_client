# vite-template-redux

Uses [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/), and [React Testing Library](https://github.com/testing-library/react-testing-library) to create a modern [React](https://react.dev/) app compatible with [Create React App](https://create-react-app.dev/)

```sh
npx degit reduxjs/redux-templates/packages/vite-template-redux my-app
```

## Start
It is necessary to upload the server-side part of the project.(https://github.com/metathen/sibers_server)
Deploy the server and update the data in the .env file with the current data of your PostgreSQL(username and password) and start migrations the database.

Next, you need to copy and deploy the client
```sh
git clone https://github.com/metathen/sibers_client
npm run start
```
To run the project, you need free ports specified in the .env and configuration files.

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## Inspiration

- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)
