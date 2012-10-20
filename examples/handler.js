var PerfTimers = require('..');

var handler = function(ids) {
    console.log(ids); // outputs [ 'x0', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9' ]
};
var timer = new PerfTimers(handler, 1);

for (var i = 0; i < 10; i ++) {
    timer.setTimeout('x' + i, 10);
}
