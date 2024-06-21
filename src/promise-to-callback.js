'use strict';

const isFn = require('./is-fn.js');
//var setImmediate = require('set-immediate-shim');
require('./setimmediate.js');

module.exports = function (promise) {
	if (!isFn(promise.then)) {
		throw new TypeError('Expected a promise');
	}

	return function (cb) {
		promise.then(function (data) {
			setImmediate(cb, null, data);
		}, function (err) {
			setImmediate(cb, err);
		});
	};
};
