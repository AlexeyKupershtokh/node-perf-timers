var perftimers = require('..');

var start = Date.now();

var x = 0;
var t = new perftimers(10);
var cb = function() { x++; t.setTimeout(cb, x % 1000); };
for (var i = 0; i < 3000000; i++) {
	t.setTimeout(cb, i % 1000 + 1);
}

setInterval(function() {
	console.log(x, Math.round(1000 * x / (Date.now() - start)), 'ops/s', process.memoryUsage().heapUsed, 'MB');
	x = 0;
	start = Date.now();
}, 1000);
