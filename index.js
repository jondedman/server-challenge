const {app} = require("./app.js");

const port = 3000; //defining what port the application should use 

app.listen(port, () => {
  console.log("Now listening on port", port);
});
