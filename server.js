const app = require("./app");

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", false);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Connect");
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
