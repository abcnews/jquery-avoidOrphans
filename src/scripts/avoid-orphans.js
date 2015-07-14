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
		_nbsp: '&nbsp;',
		_nbHyphen: '&#8209;',
		wordCountThreshold: 2
	};


	/* METHODS */

	AvoidOrphans.prototype = {

		init: function (element, options) {
			var thisPlugin = this;

			this.element = element;
			this.$element = $(element);
			this.options = this.getOptions(options);

			this.$element.each(function() {
				thisPlugin.doElement($(this));
			});
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
		},

		getNewNodeContent: function(text) {
			var lastWord,
				nodeTextAsArray;

			nodeTextAsArray = text.split(' ');
			lastWord = nodeTextAsArray.pop();

			if (lastWord.indexOf('-') > 0) {
				// last word has a hyphen so replace that with a non-breaking hyphen and call it a day
				lastWord = lastWord.replace('-', this.options._nbHyphen);
				if (nodeTextAsArray.length) {
					return nodeTextAsArray.join(' ') + ' ' + lastWord;
				} else {
					return lastWord;
				}
			} else if (lastWord === '') {
				// last word is just a space (before the next node)
				return nodeTextAsArray.join(' ') + this.options._nbsp;
			} else {
				// put a nbsp between the last word and the rest
				return nodeTextAsArray.join(' ') + this.options._nbsp + lastWord;
			}
		},

		doElement: function($elem) {
			var elemContents,
				$nodeToCheck,
				nodeToCheckText,
				newNodeText;

			// we can't do anything when there is only one or two words
			if ($elem.text().split(' ').length <= this.options.wordCountThreshold) {
				return false;
			}

			elemContents = $elem.contents();

			if (elemContents.length === 1) {
				$elem.html(this.getNewNodeContent($.trim($elem.text())));
			} else {
				// work backwards through the nodes until we find one with a space or hyphen
				for (var i = elemContents.length - 1; i >=0; i--) {
					$nodeToCheck = $(elemContents[i]);
					nodeToCheckText = $nodeToCheck.text();
					if (nodeToCheckText.indexOf(' ') >= 0 || nodeToCheckText.indexOf('-') >= 0 && (elemContents[i].nodeType === 1 || elemContents[i].nodeType === 3)) {
						newNodeText = this.getNewNodeContent(nodeToCheckText);
						if (elemContents[i].nodeType === 1) {
							$nodeToCheck.html(newNodeText);
						} else {
							$nodeToCheck.replaceWith(newNodeText); // doesn't work for text nodes
						}
						break;
					}
				}
			}
		}

	};



	/* PLUGIN DEFINITION */

	function Plugin(options) {
		return this.each(function () {
			var $this, dataKey, data;

			$this   = $(this);
			dataKey = 'plugin-avoid-orphans';
			data    = $this.data(dataKey);

			if (!data) {
				$this.data(dataKey, (data = new AvoidOrphans(this, options)));
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
