# jquery-avoid-orphans

A JQuery plugin that uses non-breaking spaces and non-breaking hyphens to avoid orphans in text (single words
on a new line at the end a paragraph or block of text).

## Dependencies

* JQuery ('cause it's a JQuery plugin)

For development you'll need [Node.js](http://nodejs.org/download/) and the dependencies managed via package.json.

## Demo

Take a look at the [demo page](build/demo.js) that is included in the project.

## Tests

Yup, there are tests in the test folder. They run in mocha via grunt (see below).

## Getting started

AvoidOrphans can be used in any browserify or AMD project out of the box. Just `require()` it.

For global browser environments, you can use add one of the JavaScript files in the `dist` folder to your page.

If JQuery isn't available when the AvoidOrphans script is loaded, don't sweat it. Just call installPlugin() when
you're ready.

	AvoidOrphans.installPlugin();

### Usage

TODO: Code example.

### Options

TODO: I'm not sure there are any.

### Methods

TODO: I'm not sure there are any.

### Develop

Run `npm install` to locally install Node package dependencies, then run the default `grunt` task which:

* Runs `grunt dev` to create a development build (see Tasks, below)
* Starts up a development server in the build directory, running on [http://localhost:8000](http://localhost:8000)
* Watches files under `src/` for changes, triggering partial development builds as required

### Build

Run `grunt build` to build the project. This will create new versions of the js files in the dist folder.