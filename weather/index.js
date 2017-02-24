'use strict';

const YQL = require('yql');
const _ = require('lodash');

/* Recovers weither of a city depending on param */
module.exports = (opts, callback) => {
	opts = opts || [];

	let query;

	/* Request on Yahoo to recovers the weither of the city specified */
	if (_.isEmpty(opts)) {
		query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="Dhaka, Bangladesh")');
	} else {
		query = new YQL('select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + opts[0] + ', ' + opts[1] + '")');
	}

	query.exec((err, response) => {
		if (err) {
			return callback(err);
		}
		callback(null, response);
	});
};
