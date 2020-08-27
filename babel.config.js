module.exports = {
	presets: [
		'@babel/preset-env',
		'@babel/typescript',
	],
	plugins: [
		[
			'@babel/plugin-transform-runtime',
			{
				corejs: 3,
			},
		],
		['@babel/plugin-proposal-decorators', { legacy: true }],
		['@babel/plugin-proposal-class-properties', { loose: true }],
		'@babel/plugin-syntax-dynamic-import',
	],
	env: {
		test: {
			presets: ['@babel/preset-env'],
			plugins: [],
		},
	},
	exclude: ['node_modules/**'],
}
