/**
 * avoid-orphans
 * A JQuery plugin that uses non-breaking spaces and non-breaking hyphens to avoid orphans in text.
 *
 * @version current_version
 * @author Peter Chappell <chappell.peter@abc.net.au>
 * */

(function(definition) {
	if (typeof module !== 'undefined'){
		// Browserify
		module.exports = definition();
	} else if (typeof define === 'function' && typeof define.amd === 'object'){
		// AMD
		define(definition);
	}
	// for just plain JS we install the plugin (added to $ namespace) instead of exposing a new global namespace
	if (typeof jQuery !== 'undefined') {
		definition().installPlugin();
	}
}(function() {

	function AvoidOrphans(element, options) {
		this.element    =
		this.$element   =
		this.options    = null;

		this.init(element, options);
	}

	AvoidOrphans.VERSION = 'current_version';

	AvoidOrphans.DEFAULTS = {
	};


	/* METHODS */

	AvoidOrphans.prototype = {

		init: function (element, options) {
			this.element = element;
			this.$element = $(element);
			this.options = this.getOptions(options);
		},

		getDefaults: function () {
			return AvoidOrphans.DEFAULTS;
		},

		getOptions: function (options) {
			options = $.extend({}, this.getDefaults(), this.$element.data(), options);
			return options;
		},

		// use for setting new options on the plugin (options can be changed between start/stop)
		setOptions: function(newOptions) {
			this.options = $.extend({}, this.options, newOptions);
		}

	};



	/* PLUGIN DEFINITION */

	function Plugin(arg1, methodOptions) {
		return this.each(function () {
			var $this, dataKey, data, method, options;

			$this   = $(this);
			dataKey = 'plugin-avoid-orphans';
			data    = $this.data(dataKey);
			if (typeof arg1 === 'object') {
				options = arg1;
			} else {
				options = methodOptions;
				method = arg1;
			}

			if (!data && method === 'destroy') {
				return;
			}
			if (!data) {
				$this.data(dataKey, (data = new AvoidOrphans(this, options)));
			}
			if (typeof method === 'string') {
				data[method](options);
			}
		});
	}



	/* INSTALLATION */

	AvoidOrphans.isPluginInstalled = false;

	AvoidOrphans.installPlugin = function installPlugin() {

		if (AvoidOrphans.isPluginInstalled) {
			return;
		}

		var old = $.fn.avoidOrphans;

		$.fn.avoidOrphans = Plugin;
		$.fn.avoidOrphans.Constructor = AvoidOrphans;

		// no conflict
		$.fn.avoidOrphans.noConflict = function () {
			$.fn.avoidOrphans = old;
			return this;
		};

		AvoidOrphans.isPluginInstalled = true;
	};

	return AvoidOrphans;

}));
