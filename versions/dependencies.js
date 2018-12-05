#!/usr/bin/env node
/* eslint no-console: 0 */

const REACT_VERSION = process.env.REACT_VERSION || '^16.0.0';
console.log('REACT_VERSION: ', REACT_VERSION);
const JEST_VERSION = '^23.6.0';

module.exports = {
	// addons
	'babel-polyfill': '^6.26.0',
	'focus-outline-manager': '^1.0.2',
	'normalize.css': '5.0.0',
	'path-to-regexp': '^2.0.0',
	'react-addons-perf': '^15.4.2',
	'react-tap-event-plugin': '^2.0.0',
	'whatwg-fetch': '^2.0.3',

	// deps: non component libs
	ajv: '^6.2.1',
	'bootstrap-sass': '3.3.7',
	'bson-objectid': '^1.1.5',
	classnames: '^2.2.5',
	'date-fns': '^1.27.2',
	keycode: '^2.2.0',
	immutable: '^3.8.1',
	immutablediff: '^0.4.4',
	invariant: '^2.2.2',
	lodash: '^4.17.4',
	'prop-types': '^15.5.10',
	react: REACT_VERSION,
	'react-dom': REACT_VERSION,
	'react-immutable-proptypes': '^2.1.0',
	i18next: '^9.0.0',
	'i18next-parser': '^0.13.0',
	'react-i18next': '^7.6.1',
	'react-redux': '^5.0.7',
	'react-router': '^3.2.0',
	'react-router-redux': '^4.0.8',
	'react-test-renderer': REACT_VERSION,
	'react-transition-group': '^2.3.1',
	redux: '^3.7.2',
	'redux-batched-actions': '^0.2.0',
	'redux-batched-subscribe': '^0.1.6',
	'redux-logger': '^3.0.6',
	'redux-mock-store': '^1.2.3',
	'redux-saga': '^0.15.4',
	'redux-thunk': '^2.2.0',
	'redux-undo': 'beta',
	reselect: '^2.5.4',
	slugify: '^1.1.0',
	uuid: '^3.0.1', // prefer bson-objectid
	tv4: '^1.3.0',

	// deps: libs that interact with the DOM
	'd3-shape': '1.2.0',
	'react-ace': '5.2.0',
	'react-bootstrap': '0.31.5',
	'rc-slider': '8.6.1',
	'rc-tooltip': '3.7.2',
	'react-autowhatever': '10.1.2',
	'react-debounce-input': '3.2.0',
	'react-jsonschema-form': '0.51.0',
	'react-virtualized': '9.21.0',

	// script dep
	deepmerge: '^1.5.1',

	// dev deps
	'@storybook/react': '^3.4.7',
	'@storybook/addon-storyshots': '^3.4.7',
	'@storybook/addon-actions': '^3.4.7',
	'@storybook/addon-info': '^3.4.7',
	'@storybook/addon-knobs': '^3.4.7',
	'@storybook/addons': '^3.4.7',
	autoprefixer: '^7.1.4',
	'babel-cli': '^6.26.0',
	'babel-core': '^6.26.0',
	'babel-eslint': '8.0.1',
	'babel-jest': JEST_VERSION,
	'babel-plugin-transform-class-properties': '^6.24.1',
	'babel-plugin-transform-export-extensions': '^6.22.0',
	'babel-plugin-transform-object-assign': '^6.22.0',
	'babel-plugin-transform-object-rest-spread': '^6.26.0',
	'babel-preset-env': '^1.6.0',
	'babel-preset-react': '^6.24.1',
	cpx: '^1.5.0',
	enzyme: '^3.1.0',
	'enzyme-adapter-react-15': '^1.0.1',
	'enzyme-adapter-react-16': '^1.1.1',
	'enzyme-to-json': '^3.0.0',
	eslint: '^3.6.1',
	'eslint-config-airbnb': '^11.1.0',
	'eslint-plugin-import': '^1.16.0',
	'eslint-plugin-jsx-a11y': '^2.2.2',
	'eslint-plugin-react': '^6.3.0',
	jest: JEST_VERSION,
	'jest-cli': JEST_VERSION,
	'jest-in-case': '^1.0.2',
	jsdom: '^11.11.0',
	prettier: '^1.6.1',
	'react-storybook-cmf': '^0.4.0',
	'react-stub-context': '^0.7.0',
	rimraf: '^2.6.1',

	// webpack
	'babel-loader': '^7.1.2',
	'copy-webpack-plugin': '^4.1.1',
	'css-loader': '^0.28.7',
	'extract-text-webpack-plugin': '^3.0.2',
	'file-loader': '^1.1.5',
	'webfonts-loader': '^4.2.1',
	'node-sass': '^4.7.2',
	'postcss-loader': '^2.0.8',
	'sass-loader': '^6.0.6',
	'style-loader': '^0.19.0',
	'url-loader': '^0.6.2',
	webpack: '^3.8.1',
	'webpack-bundle-analyzer': '^2.9.0',
	'webpack-dashboard': '^2.0.0',
	'webpack-dev-server': '^2.9.3',
};
