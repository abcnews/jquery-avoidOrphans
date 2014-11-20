module.exports = {
	"options": {
		"livereload": true
	},
	"gruntfile": {
		"files": ["Gruntfile.js","grunt/*.js"],
		"tasks": ["jshint:gruntfile"],
		"interrupt": true
	},
	"js": {
		"files": "src/scripts/**/*",
		"tasks": ["jshint:js"],
		"interrupt": true
	},
	"copy": {
		"files": ["src/**/*"],
		"tasks": "copy:dev",
		"interrupt": true
	},
	"version": {
		"files": ["package.json"],
		"tasks": "version",
		"interrupt": true
	}
};
