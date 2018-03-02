var ecmaFeatures = {
  'jsx': true,
  'arrowFunctions': true,
  'blockBindings': true,
  'defaultParams': true,
  'destructuring': true,
  'forOf': true,
  'generators': true,
  'objectLiteralComputedProperties': true,
  'objectLiteralShorthandMethods': true,
  'objectLiteralShorthandProperties': true,
  'experimentalObjectRestSpread': true,
  'restParams': true,
  'spread': true,
  'templateStrings': true,
  'modules': true,
  'classes': true
};

var rules = {
  'comma-dangle': 0,
  'new-cap': 0,
  'arrow-body-style': 0,
  'prefer-template': 0,
  'no-underscore-dangle': 0,
  'object-shorthand': 0,
  'func-names': 0,
  'no-extra-parens': ['error', 'functions'],
  'dot-notation': 0,
  'max-len': 0,
  'camelcase': 0,
  'class-methods-use-this': 0,
  'no-plusplus': 0,
  'no-param-reassign': 0,
  'react/jsx-pascal-case': 0,
  'prefer-const': 0,
  'react/jsx-filename-extension': 0,
  'linebreak-style': 0,
  'react/require-extension': 0
};

module.exports = {
  'extends': 'airbnb',
  'env': {
    'browser': true,
    'node': true,
    'es6': true
  },
  'globals': {
    'describe': true,
    'it': true
  },
  'plugins': [
    'react'
  ],
  'parserOptions': {
    'sourceType': 'module',
    'ecmaFeatures': ecmaFeatures
  },
  'ecmaFeatures': ecmaFeatures,
  rules: rules
};
