node-perf-timers
================

High performance but limited replacement for <a href="http://nodejs.org/api/globals.html#globals_settimeout_cb_ms">setTimeout()</a>.

It's about 5-20 times faster and requires 20 times less memory for handling timers (not including callback copies);

Compared to setTimeout() there are some drawbacks that make it limited for using:
 - It does not support <a href="http://nodejs.org/api/domain.html">domains</a>.
 - It does not have <a href="http://nodejs.org/api/globals.html#globals_cleartimeout_t">clearTimeout()</a> analog. Just make it have no efect and let it fire. Check <a href='https://github.com/AlexeyKupershtokh/node-perf-timers/blob/master/examples/let_it_fire.js'>examples/let_it_fire.js</a>.
 - It does not support argument passing: <a href="https://github.com/joyent/node/blob/master/lib/timers.js#L184">setTimeout(function(a, b, c) { ... }, 1000, 'a', 'b', 'c');</a>. Though consider handler technique shown below in a usage section.
 - Under no heavy load it tends to execute tasks later than setTimeout would. Though under heavy load when setTimeout starts dropping behind, and perf-timers behave more in time. Check <a href='https://github.com/AlexeyKupershtokh/node-perf-timers/blob/master/perf/setTimeout-delay.js'>perf/setTimeout-delay.js</a> vs. <a href='https://github.com/AlexeyKupershtokh/node-perf-timers/blob/master/perf/perf-timers-delay.js'>perf/perf-timers-delay.js</a>
 - It does not guarantee order of execution.

Installation
============

```
npm install perf-timers
```

Usage
=====
```javascript
var PerfTimers = require('..');
var timer = new PerfTimers();
var now = Date.now();
timer.setTimeout(function() {
  console.log('Delay', Date.now() - now);
}, 1000);
```
```
Delay: 1088
```
Improved usage:
```javascript
var PerfTimers = require('..');
var handler = function(ids) {
    console.log(ids);
};
var timer = new PerfTimers(handler, 1);
for (var i = 0; i < 10; i ++) {
    timer.setTimeout('x' + i, 10);
}
```
```
[ 'x0', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9' ]
```

If you want to use more precise timers on short distances, use shorter interval `new PerfTimers(1);`
If you need timers running for hours it would be better to use longer interval (yes, timer accuracy will be minutewise): `new PerfTimers(60 * 1000);`
A rule of thumb for best performance is to keep interval between `average timer / 1000` and `average timer / 3`.