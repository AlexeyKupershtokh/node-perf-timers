var Timer = process.binding('timer_wrap').Timer;

var start = Date.now();

var x = 0;
function mySetTimeout(cb, timeout) {
	var t = new Timer();
	t.ontimeout = function() {
		cb();
		t.close();
	};
	t.start(timeout, 0);
}

var cb = function() { x++; mySetTimeout(cb, x % 1000); };
for (var i = 0; i < 1000000; i++) {
	mySetTimeout(cb, i % 1000 + 1);
}

setInterval(function() {
	console.log(x, Math.round(1000 * x / (Date.now() - start)), 'ops/s', process.memoryUsage().heapUsed, 'MB');
	x = 0;
	start = Date.now();
}, 1000);
