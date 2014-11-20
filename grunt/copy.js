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
			"src": ["avoid-orphans.js"],
			"dest": "dist/"
		}]
	}
};
