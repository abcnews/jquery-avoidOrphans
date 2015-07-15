# jquery-avoid-orphans

A JQuery plugin that uses non-breaking spaces and non-breaking hyphens to avoid orphans in text (single words
on a new line at the end a paragraph or block of text).

Demo page: [http://abcnews.github.io/jquery-avoidOrphans/](http://abcnews.github.io/jquery-avoidOrphans/)

## Dependencies

* JQuery ('cause it's a JQuery plugin)

For development you'll need [Node.js](http://nodejs.org/download/) and the dependencies managed via package.json.

## Tests

Yup, there are tests in the test folder. They run in mocha via grunt (see below). They can also be viewed in the
browser. Just open `/test/index.html` directly in your browser.

## Getting started

AvoidOrphans can be used in any browserify or AMD project out of the box. Just `require()` it.

Built (minified and unminified) JS can be found in the dist folder and can be used without needing to build the project
yourself.

For global browser environments, you can use add one of the JavaScript files in the `dist` folder to your page.

If JQuery isn't available when the AvoidOrphans script is loaded, don't sweat it. Just call installPlugin() when
you're ready.

	AvoidOrphans.installPlugin();

## Usage

With content like this...

	<div id="content">
		<p>I am a paragraph.</p>
		<p>I am another paragraph.</p>
		<p>And I know it's debatable whether you could call us all paragraphs, but you get the idea...</p>
	</div>

You could apply avoid orphans to each paragraph like so...

	$('#content p').avoidOrphans();

Note that if you did this...

	$('#content').avoidOrphans();

... only the last line (the last paragraph) would have avoid orphans applied.

Take a look at the demo page to see this in action.

### Options

If you really want to you can override the defaults...

	AvoidOrphans.DEFAULTS = {
		_nbsp: '&nbsp;',        // the character to use for the non-breaking space
		_nbHyphen: '&#8209;',   // the character to use for the non-breaking hyphen
		wordCountThreshold: 2   // the number of words in total needed in order for us to do anything
	};

Note that by default, avoidOrphans won't do anything if there is only one or two words in total in the element (if two
words don't fit in a space, you probably actually do want them to wrap or maybe you need a bigger space). You can use
the wordCountThreshold option to override this like so...

	$('#content').avoidOrphans({
		wordCountThreshold: 1
	});

## Develop

Run `npm install` to locally install Node package dependencies, then run the default `grunt` task which:

* Runs `grunt dev` to create a development build (see Tasks, below)
* Starts up a development server in the build directory, running on [http://localhost:8000](http://localhost:8000)
* Watches files under `src/` for changes, triggering partial development builds as required
* Runs the tests in phantom js and runs them again when js or test files change.

With the default grunt task running you can take a look at the demo page at http://localhost:8000/.

You can also view the tests in a browser

### Build

Run `grunt build` to build the project. This will create new versions of the js files in the dist folder. You should do
this as part of making any PRs etc.

### Release

Run `grunt release` to do a build AND publish the demo page. Run this after a PR has been accepted and merged.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed
functionality. Lint and test your code using the Grunt tasks included in the project (and described above).
