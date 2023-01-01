import { app, startApp } from './app';

const port = 4000;

const thrower = (err: unknown): void => {
  throw err;
};
const throwToGlobal = (err: unknown): NodeJS.Immediate => setImmediate(() => thrower(err));

process.on('unhandledRejection', throwToGlobal);

startApp()
  .then(() => {
    app.listen(port, () => {
      /* eslint-disable-next-line no-console */
      console.log(`Server is listening on port ${port}.`);
    });
  })
  .catch(throwToGlobal);
