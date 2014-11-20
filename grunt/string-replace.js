module.exports = {
	"version": {
		"options": {
			"replacements": [
				{
					"pattern": /current_version/g,
					"replacement": "<%= pkg.version %>"
				}
			]
		},
		"files": [
			{"src": "build/scripts/accessible-spinner.js", "dest": "build/scripts/accessible-spinner.js"}
		]
	}
};
