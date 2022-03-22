const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const app = express();
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const { urlencoded } = require("express");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const veriftJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");

console.log("ello");

const PORT = process.env.PORT || 4000;

//custom middleware
app.use(logger);
app.use(credentials);

app.use(cors(corsOptions));

//url encoded data middleware
app.use(express.urlencoded({ extended: false }));

//json middleware
app.use(express.json());

//cookie middleware
app.use(cookieParser());
//
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/api/register"));
app.use("/auth", require("./routes/api/auth"));
app.use("/refresh", require("./routes/api/auth"));
app.use("/logout", require("./routes/api/logout"));

//app.use("/test", require("./routes/test"));
app.use(veriftJWT);
app.use("/users", require("./routes/api/users"));

app.all("*", (req, res) => {
  res.status(400);
  res.send("404 not found");
  res.json({ error: "404 not found" });
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
