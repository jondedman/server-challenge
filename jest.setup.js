// jest.setup.js
const { app, repopulateGigs } = require('./app.js');

let server;

beforeAll(async () => {
  server = app.listen(3001); // Use different port for tests
  console.log('Test server started on port 3001');
});

afterAll(async () => {
  if (server) {
    await new Promise((resolve) => {
      server.close(resolve);
    });
    console.log('Test server stopped');
  }
});

beforeEach(() => {
  repopulateGigs();
});