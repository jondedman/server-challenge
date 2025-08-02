// jest.setup.js
// WHY THIS FILE EXISTS (Why can't I just run "node index.js" separately?):
// 
// PROBLEM WITH MANUAL SERVER:
// 1. Manual process: You'd have to remember to start/stop server manually
// 2. Port conflicts: Production server (port 3000) vs test server (port 3001)
// 3. Data contamination: Tests would modify production data in memory
// 4. Race conditions: No guarantee server is ready before tests start
// 5. CI/CD failure: Automated testing environments can't rely on manual steps
// 6. Test isolation: Each test run needs fresh server state
//
// THIS FILE SOLVES:
// ✅ Automatic server lifecycle (start before tests, stop after)
// ✅ Isolated test port (3001) separate from production (3000)
// ✅ Fresh data for each test (beforeEach repopulation)
// ✅ Guaranteed server readiness (await listening event)
// ✅ Works in CI/CD pipelines without manual intervention
// ✅ Clean test environment every time

// SCALING TO DATABASE TESTING:
// This same setup pattern works with databases - just add database lifecycle:
//
// beforeAll(async () => {
//   await startTestDatabase();        // Start in-memory DB (MongoDB Memory Server, SQLite)
//   server = app.listen(3001);        // Server setup stays the same
//   await new Promise(resolve => server.on('listening', resolve));
// });
//
// beforeEach(async () => {
//   await clearDatabase();            // Replace repopulateGigs() with DB operations
//   await seedTestData();            // Insert fresh test data
// });
//
// afterAll(async () => {
//   await server.close();            // Server cleanup stays the same
//   await stopTestDatabase();        // Add database cleanup
// });
//
// Server management logic remains identical - only data layer changes!
const { app, repopulateGigs } = require('./app.js');

let server;

// PROMISE WRAPPER EXPLANATION:
// Express app.listen() uses OLD callback/event pattern, NOT modern Promises
// await app.listen(3001) ❌ - doesn't work (not a Promise)
// So we manually wrap the 'listening' event in a Promise to use async/await ✅

beforeAll(async () => {
    console.log("starting before all");
    
  server = app.listen(3001); // Use different port for tests

  // MANUAL PROMISE CREATION:
  // new Promise() constructor expects a function with (resolve, reject) parameters
  // Promise gives US these functions - we don't create them
  await new Promise((resolve) => {
    //               ^^^^^^^^^ This parameter is PROVIDED by Promise constructor
    // EVENT LISTENER SYNTAX:
    // object.on('eventName', callbackFunction)
    // "When 'listening' event happens, run this callback"
    server.on('listening', () => {
        console.log('Test server started on port 3001');
        // CALLING RESOLVE:
        // resolve() = "Promise is complete, continue execution"
        // This is the bridge between events and Promises
        resolve();
    });
  });
  // ^^^ await pauses HERE until resolve() is called above


  // Add a small delay to ensure server is fully ready
    // TIMEOUT PROMISE:
  // setTimeout normally uses callbacks, but we wrap it in Promise
  await new Promise(resolve => setTimeout(resolve, 100));
  //                ^^^^^^^ Arrow function: (resolve) => {...}
  //                         setTimeout(callback, delay)
  //                         We pass resolve as the callback
  console.log('✅ Server should be fully ready now');
  
}, 10000); // Increase timeout

afterAll(async () => {
    console.log("starting server shutdown");
    
  if (server) {
    // PROMISE WRAPPER FOR CLOSE:
    // server.close() also uses callback pattern, not Promises
    await new Promise((resolve) => {
      //           ^^^^^^^ When close() finishes, it calls resolve()   
      server.close(resolve);
    });
    console.log('Test server stopped');
  }
});

beforeEach(() => {
  repopulateGigs();
});


// KEY SYNTAX PATTERNS:
// 
// 1. ARROW FUNCTIONS:
//    () => {}           // No parameters
//    (param) => {}      // One parameter  
//    (a, b) => {}       // Multiple parameters
//
// 2. PROMISE CONSTRUCTOR:
//    new Promise((resolve, reject) => {
//      // resolve = function to complete successfully
//      // reject = function to complete with error
//    })
//
// 3. EVENT LISTENERS:
//    object.on('eventName', callback)
//    // When eventName fires, callback runs
//
// 4. CALLBACK TO PROMISE PATTERN:
//    // Old way:
//    doSomething(callback)
//    
//    // Promise way:
//    await new Promise((resolve) => {
//      doSomething(resolve) // Pass resolve as callback
//    })