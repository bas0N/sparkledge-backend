const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const { urlencoded } = require("express");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

console.log("ello");

const PORT = process.env.PORT || 4000;

//custom middleware
app.use(logger);
//cors
const whitelist = ["https://sparkledge.pl", "https://localhost:3500"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("CORS ERROR"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//url encoded data middleware
app.use(express.urlencoded({ extended: false }));

//json middleware
app.use(express.json());
app.use("/", require("./routes/root"));
app.use("/test", require("./routes/test"));
//app.use("/users", require("./routes/api/users"));

app.all("*", (req, res) => {
  res.status(400);
  res.send("404 not found");
  res.json({ error: "404 not found" });
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
