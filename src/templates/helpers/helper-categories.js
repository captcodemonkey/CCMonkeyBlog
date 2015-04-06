
	module.exports.register = function(Handlebars, options) {

		var grunt  = require('grunt');
		var yfm = require('assemble-front-matter');
		var _ = require('underscore');
		path = require('path');

		/*
		 * Function for using minimatch patterns to grab the files and render a list
		 */
		var categories = function(src, category) {

			var pages = [];
			var content;
			content = grunt.file.expand(src).map(function(path) {
				return {path: path};
			}).map(function(obj) {
				var FM = getFM(obj.path);
				pages.push(FM);
			});

			if(category !== false) {
				pages = _.filter(pages, function(entry) {
					return _.contains(entry.categories, category);
				});
			}

			pages = _.sortBy(pages, function(entry) {
				return entry.date;
			});

			return pages.reverse();
		};

		var getFM = function(src) {
			return yfm.extract(src).context;
		};

		/*
		 * categories helper
		 */
		Handlebars.registerHelper("categories", function(src, category, opts) {
			var pages = categories(src, category);
			return _.map(pages, function(item) {
				return opts.fn(item);
			}).join(grunt.util.normalizelf(grunt.util.linefeed));
		});

	};