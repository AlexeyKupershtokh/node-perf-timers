var perftimers = require('..');

var start = Date.now();

var x = 0;
var handler = function(p) {
    for (var j = 0, l = p.length; j < l; j++) {
        x++;
		var i = p[j];
		t.setTimeout(i, i % 5000 + 1);
	}
};
var t = new perftimers(handler, 1);
for (var i = 0; i < 5000000; i++) {
	t.setTimeout(i, i % 5000 + 1);
}

setInterval(function() {
	console.log(x, Math.round(1000 * x / (Date.now() - start)), 'ops/s', process.memoryUsage().heapUsed, 'MB');
	x = 0;
	start = Date.now();
}, 1000);
