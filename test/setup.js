global.__DEV__ = true;
require('fetch-mock').greed = 'bad';
require('babel-register')({
  // ignore node_modules except node_modules/react-native-lock,
  // because it needs to be transpiled
  // syntax: /node_modules\/(?!(library1|library2))/
  ignore: /node_modules\/(react-native-?!(react-native-lock))/
});

// Borrow mocking implementation from react-native-mock
const createMockComponent = require('react-native-mock/src/components/createMockComponent');

// Override require to handle image imports
const module = require('module');
const originalLoader = module._load;

module._load = function overrideModuleLoader(request, ...args) {

  // mock third party modules
  if (request === 'groupByEveryN') {
    return createMockComponent(request);
  }
  if (request === 'logError') {
    return createMockComponent(request);
  }

  return originalLoader(request, ...args);
};
