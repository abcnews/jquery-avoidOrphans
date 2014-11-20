module.exports = function(grunt) {

	require('time-grunt')(grunt);
	require('load-grunt-config')(grunt, {
		data: {
			pkg: grunt.file.readJSON('package.json')
		}
	});

};
