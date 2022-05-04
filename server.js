require("dotenv").config();
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
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

const PORT = process.env.PORT || 4000;
//connect to the DB
connectDB();

//use middleware serving logs
app.use(logger);
//use middleware serving credentials
app.use(credentials);
//use middleware serivng cors check
app.use(cors(corsOptions));

//url encoded data middleware
app.use(express.urlencoded({ extended: false }));

//json middleware
app.use(express.json());

//cookie parser middleware
app.use(cookieParser());

//paths that do not require JWT verification
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/api/register"));
app.use("/auth", require("./routes/api/auth"));
app.use("/refresh", require("./routes/api/refresh"));
app.use("/logout", require("./routes/api/logout"));
app.use("/infrastructure", require("./routes/api/infrastructure"));

//paths that do require JWT verification
app.use(verifyJWT);
app.use("/documents", require("./routes/api/documents"));
app.use("/users", require("./routes/api/users"));
app.use("/filesDev", require("./routes/api/filesDev"));

app.all("*", (req, res) => {
  res.status(400);
  res.send("404 not found");
  res.json({ error: "404 not found" });
});
app.use(errorHandler);

//checking if the connectin is correct
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });
});
