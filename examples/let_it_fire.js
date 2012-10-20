var PerfTimers = require('..');

var packets = {};
var start = Date.now();
var cleanup = function(id) {
    console.log(Date.now() - start, JSON.stringify(packets));
    delete packets[id];
};
var timer = new PerfTimers(1);

for (var id = 0; id < 10; id ++) {
    // add packets
    packets[id] = 'p' + id;

    // schedule timeout cleanup for them
    var cb = function(id) { return function() { cleanup(id); }; }(id);
    timer.setTimeout(cb, id * 100);

    // emulate that some of them will be deleted somewhere else, using standard setTimeout
    if (id % 3 == 0) {
        setTimeout(function(id) { delete packets[id]; }, 50, id)
    }
}
