const { expo } = require("./app.json");

module.exports = {
  expo: {
    ...expo,
    android: {
      ...expo.android,
      config: {
        ...expo.android?.config,
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },
  },
};
