// my-plugin.js

const { withAndroidManifest } = require('@expo/config-plugins');

const withAndroidQueries = config => {
  return withAndroidManifest(config, async config => {
    const appQueries = config.modResults.manifest.queries || [];
    const newQueries = [
      {
        intent: [
          {
            action: [{ $: { 'android:name': 'android.intent.action.VIEW' } }],
            data: [{ $: { 'android:scheme': 'https' } }],
          },
          {
            action: [{ $: { 'android:name': 'android.intent.action.SENDTO' } }],
            data: [{ $: { 'android:scheme': 'mailto' } }],
          },
          {
            action: [{ $: { 'android:name': 'android.intent.action.DIAL' } }],
          },
        ],
      },
    ];

    config.modResults.manifest.queries = [...appQueries, ...newQueries];

    return config;
  });
};

module.exports = withAndroidQueries;