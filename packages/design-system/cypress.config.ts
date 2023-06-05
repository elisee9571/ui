import { defineConfig } from 'cypress';

import path from 'path';

import {
	getWebpackRules,
	getWebpackPlugins,
} from '@talend/scripts-config-react-webpack/config/webpack.config.common';

const webpackConfig = {
	mode: 'development',
	entry: [path.join(__dirname, 'src', 'index.ts')],
	output: {
		path: path.resolve(__dirname, 'dist'),
	},
	devtool: false,
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		fallback: {
			url: false,
		},
	},
	module: {
		rules: getWebpackRules([path.resolve(process.cwd(), './src/')], true, true),
	},
	plugins: getWebpackPlugins(),
};

export default defineConfig({
	component: {
		devServer: {
			framework: 'react',
			bundler: 'webpack',
			webpackConfig,
		},
	},
});
