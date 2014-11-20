module.exports = {
	"dev": {
		"files": [{
			"expand": true,
			"cwd": "src/",
			"src": ["**/*"],
			"dest": "build/"
		}]
	},
	"build": {
		"files": [{
			"expand": true,
			"cwd": "build/scripts",
			"src": ["accessible-spinner.js"],
			"dest": "dist/"
		}]
	}
};
