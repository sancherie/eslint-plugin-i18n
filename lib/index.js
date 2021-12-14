/**
 * @fileoverview Find the missing translations in a project
 * @author sancherie
 */
"use strict";

module.exports = {
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'missing-translation': require('./rules/missing-translation')
  },
  configs: {
    base: require('./configs/base'),
  },
  processors: {
    '.vue': require('./processor')
  },
}

