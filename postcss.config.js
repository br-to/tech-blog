module.exports = {
	plugins: {
		"@csstools/postcss-global-data": {
			files: ["src/styles/customMedia.css"],
		},
		"postcss-custom-media": {},
		"postcss-preset-env": {
			stage: 3,
			features: {
				"custom-properties": false,
			},
		},
	},
};
