const optimizelySdk = require('@optimizely/optimizely-sdk');

const optimizelyClient = optimizelySdk.createInstance({
  sdkKey: process.env.OPTIMIZELY_SDK_KEY,
  datafileOptions: {
    autoUpdate: true,
    updateInterval: 1000,
  },
});

optimizelyClient.onReady().then(() => {
  console.log('Optimizely client ready');
});

module.exports = optimizelyClient;
