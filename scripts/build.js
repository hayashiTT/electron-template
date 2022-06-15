const { build } = require('electron-builder');

build({
  config: {
    appId: 'com.example.electron',
    productName: 'electron-template',
    files: ['src/**/*'],
    "win": {
      "requestedExecutionLevel": "requireAdministrator"
    }
  },
});