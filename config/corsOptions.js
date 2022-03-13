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

module.exports = corsOptions;
