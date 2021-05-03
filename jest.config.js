module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: [
        '<rootDir>/jest.setup.js',
        './node_modules/react-native-gesture-handler/jestSetup.js'
      ],
    transformIgnorePatterns: [
        'node_modules/(?!@react-native|react-native|@react-navigation|expo|polyfills|Libraries|react-navigation|native-base|native-base-shoutem-theme|@shoutem/theme|@shoutem/animation|@shoutem/ui|tcomb-form-native|@unimodules|@expo|@codler|@react-native-community/art)'
      ],
      snapshotSerializers: [
        'enzyme-to-json/serializer'
      ]
  }