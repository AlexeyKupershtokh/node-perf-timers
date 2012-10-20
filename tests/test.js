var perftimers = require('..');

var t = new perftimers(100);
t.setTimeout(function() {
	var now = Date.now();
	var diff = now - then;
	if ((diff < 1000) || (diff > 1220)) throw new Exception();
}, 1020);
t.setTimeout(function() {
	var now = Date.now();
	var diff = now - then;
	if ((diff < 490) || (diff > 710)) throw new Exception();
}, 500);
var then = Date.now();
