const express = require("express");


const port = process.env.PORT || 5000;
const app = require("./server/server")

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
