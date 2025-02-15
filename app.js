const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json())

app.use(cors());

const port = 3000;

app.listen(port, () => {
  console.log("Now listening on port", port);
});
