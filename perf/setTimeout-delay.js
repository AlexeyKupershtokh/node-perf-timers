var start = Date.now();

var x = 0;
var sum500 = 0;
var n500 = 0;
var calc_delay = function(i) {
    if (i % 1000 == 500) {
        var now = Date.now();
    }
    return function() {
        if (i % 1000 == 500) {
            var delay = Date.now() - now;
            sum500 += delay;
            n500++;
        }
		x++;
		setTimeout(calc_delay(i), i % 1000)
	}
};
for (var i = 0; i < 300000; i++) {
	setTimeout(calc_delay(i), i % 1000 + 1);
}

setInterval(function() {
	console.log(x, Math.round(1000 * x / (Date.now() - start)), 'ops/s', process.memoryUsage().heapUsed, 'MB', Math.round(sum500 / n500), 'avg delay');
	x = 0;
    sum500 = 0;
    n500 = 0;
    start = Date.now();
}, 1000);
