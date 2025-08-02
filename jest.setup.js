// jest.setup.js
const { app, repopulateGigs } = require('./app.js');

let server;

beforeAll(async () => {
    console.log("starting before all");
    
  server = app.listen(3001); // Use different port for tests
  await new Promise((resolve) => {
    server.on('listening', () => {
        console.log('Test server started on port 3001');
        resolve();
    });
  });


  // Add a small delay to ensure server is fully ready
  await new Promise(resolve => setTimeout(resolve, 100));
  console.log('✅ Server should be fully ready now');
  
}, 10000); // Increase timeout

afterAll(async () => {
    console.log("starting server shutdown");
    
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