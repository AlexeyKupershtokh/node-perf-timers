module.exports = PerfTimers = function(handler_or_interval, interval) {
	if (typeof handler_or_interval == 'function') {
		this.handler = handler_or_interval;
		this.interval = interval || 100;
	} else {
		this.handler = null;
		this.interval = handler_or_interval || 100;
	}
    this.timers = {};
    this.i = null;
    this.now = Date.now();
	this.__iterate = this._iterate.bind(this);
};
PerfTimers.prototype.setTimeout = function(cb, timeout) {
    var at = this.now + this.interval + timeout;
    at -= at % this.interval;
    var t = this.timers[at] || (t = this.timers[at] = []);
    t.push(cb);
	this.i = this.i || setInterval(this.__iterate, this.interval);
};
PerfTimers.prototype._iterate = function() {
    var n = this.now = Date.now();
    for (var at in this.timers) if (at < n) {
		var t = this.timers[at], l = t.length;
		delete this.timers[at];
		if (this.handler) this.handler(t);
		else for (var i = 0; i < l; i++) t[i]();
    }
	for (var at2 in this.timers) break;
	!at2 && this.i && clearInterval(this.i);
};
