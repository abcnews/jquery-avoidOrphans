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
			{"src": "build/scripts/avoid-orphans.js", "dest": "build/scripts/avoid-orphans.js"}
		]
	}
};
