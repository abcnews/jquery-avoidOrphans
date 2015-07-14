describe('Avoid Orphans', function(){
	var $test;

	it('Exists as a Jquery plugin', function() {
		$test = $('<div />');
		expect(typeof $test.avoidOrphans).to.be('function');
	});

	it('works for a single line', function() {
		$test = $('<p>This is a single line</p>');
		$test.avoidOrphans();
		expect($test.html()).to.be('This is a single&nbsp;line');
	});

	it('works when there is a space at the end', function() {
		$test = $('<p>This is a line with a space at the end </p>');
		$test.avoidOrphans();
		expect($test.html()).to.be('This is a line with a space at the&nbsp;end');
	});

	it('works when the line ends in a dot.', function() {
		$test = $('<p>This is a single line with a dot.</p>');
		$test.avoidOrphans();
		expect($test.html()).to.be('This is a single line with a&nbsp;dot.');
	});

	it('works with a link at the end', function() {
		$test = $('<p>This is a single line with a link at the <a href="#">end</a></p>');
		$test.avoidOrphans();
		expect($test.html()).to.be('This is a single line with a link at the&nbsp;<a href="#">end</a>');
	});

	it('works with a link at the end followed by a dot', function() {
		$test = $('<p>This is a single line with a link at the <a href="#">end</a>.</p>');
		$test.avoidOrphans();
		expect($test.html()).to.be('This is a single line with a link at the&nbsp;<a href="#">end</a>.');
	});

	it('works with a link at the end preceded by another tag', function() {
		$test = $('<p>This is a single line with a link at <b>the</b> <a href="#">end</a></p>');
		$test.avoidOrphans();
		expect($test.html()).to.be('This is a single line with a link at <b>the</b>&nbsp;<a href="#">end</a>');
	});

	it('works with a link at the end preceded by another tag and followed by a dot.', function() {
		$test = $('<p>This is a single line with a link at <b>the</b> <a href="#">end</a>.</p>');
		$test.avoidOrphans();
		expect($test.html()).to.be('This is a single line with a link at <b>the</b>&nbsp;<a href="#">end</a>.');
	});

	it('works when ending in silly punctuation', function() {
		$test = $('<p>This is a single line with a link at the end <a href="#">followed by stupid punctuation</a>!!!</p>');
		$test.avoidOrphans();
		expect($test.html()).to.be('This is a single line with a link at the end <a href="#">followed by stupid&nbsp;punctuation</a>!!!');
	});

	it('works with a link at the end followed by silly punctuation', function() {
		$test = $('<p>This is a single line with a link at the end followed by stupid <a href="#">punctuation</a>!!!</p>');
		$test.avoidOrphans();
		expect($test.html()).to.be('This is a single line with a link at the end followed by stupid&nbsp;<a href="#">punctuation</a>!!!');
	});

	it('works with a link at the end that is more than one word long', function() {
		$test = $('<p>This is a single line with a link <a href="#">at the end</a></p>');
		$test.avoidOrphans();
		expect($test.html()).to.be('This is a single line with a link <a href="#">at the&nbsp;end</a>');
	});

	it('works with html tags', function() {
		$test = $('<p>This is a single line with <b>html</b> <i>tags</i> in it</p>');
		$test.avoidOrphans();
		expect($test.html()).to.be('This is a single line with <b>html</b> <i>tags</i> in&nbsp;it');
	});

	it('works when ending in a hyphened word', function() {
		$test = $('<p>This is a single line ending with a hyphened-word</p>');
		$test.avoidOrphans();
		expect($test.html()).to.be('This is a single line ending with a hyphened‑word'); // note that the hyphen in the to.be is non-breaking
	});

	it('works when ending in a hyphened word with other hyphened words', function() {
		$test = $('<p>This is a single line with a hyphened-word ending with a hyphened-word</p>');
		$test.avoidOrphans();
		expect($test.html()).to.be('This is a single line with a hyphened-word ending with a hyphened‑word'); // note that the hyphen in the to.be is non-breaking
	});

	it('works when ending with a linked hyphened word', function() {
		$test = $('<p>This is a single line ending with a linked <a href="#">hyphened-word</a></p>');
		$test.avoidOrphans();
		expect($test.html()).to.be('This is a single line ending with a linked <a href="#">hyphened‑word</a>'); // note that the hyphen in the to.be is non-breaking
	});

	it('works when ending when a link that is more than one word long ending in a hyphened word', function() {
		$test = $('<p>This is a single line ending with <a href="#">a linked hyphened-word</a></p>');
		$test.avoidOrphans();
		expect($test.html()).to.be('This is a single line ending with <a href="#">a linked hyphened‑word</a>'); // note that the hyphen in the to.be is non-breaking
	});

	it('works with a repeated word', function() {
		$test = $('<p>This is a single line with a repeated word repeated</p>');
		$test.avoidOrphans();
		expect($test.html()).to.be('This is a single line with a repeated word&nbsp;repeated');
	});

	it('works for multiple elements in a container', function() {
		$test = $('<div><p>This is a single line</p><p>This is a single line with a link at the <a href="#">end</a></p><p>This is a single line ending with a hyphened-word</p></div>');
		$('p', $test).avoidOrphans();
		expect($test.html()).to.be('<p>This is a single&nbsp;line</p><p>This is a single line with a link at the&nbsp;<a href="#">end</a></p><p>This is a single line ending with a hyphened‑word</p>');
	});

	it('doesn\'t do anything when there\'s only one word', function() {
		$test = $('<div><p>Word</p></div>');
		$('p', $test).avoidOrphans();
		expect($test.html()).to.be('<p>Word</p>');
	});

	it('doesn\'t do anything when there\'s only two words', function() {
		$test = $('<div><p>Two Words</p></div>');
		$('p', $test).avoidOrphans();
		expect($test.html()).to.be('<p>Two Words</p>');
	});

	it('does do only two words if you *really* want it to', function() {
		$test = $('<div><p>Two Words</p></div>');
		$('p', $test).avoidOrphans({
			wordCountThreshold: 1
		});
		expect($test.html()).to.be('<p>Two&nbsp;Words</p>');
	});

});
