var PerfTimers = require('..');
var timer = new PerfTimers();
var now = Date.now();
timer.setTimeout(function() {
	console.log('Delay', Date.now() - now);
}, 1000);