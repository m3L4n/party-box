// my-plugin.js

const { withAndroidManifest, AndroidConfig } = require('@expo/config-plugins');

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

    AndroidConfig.Permissions.addPermission(config, 'android.permission.INTERNET')
    AndroidConfig.Permissions.addPermission(config, 'android.permission.ACCESS_NETWORK_STATE')

    return config;
  });
};

module.exports = withAndroidQueries;
