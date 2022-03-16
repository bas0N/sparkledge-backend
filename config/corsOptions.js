const allowedOrigins = require("./allowedOrigins");

//cors
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("CORS ERROR"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
