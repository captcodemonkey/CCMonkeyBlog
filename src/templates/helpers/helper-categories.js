(function() {
	module.exports.register = function(Handlebars, options) {

		var grunt  = require('grunt');
		var yfm = require('assemble-front-matter');
		var _ = require('underscore');
		path = require('path');

		/*
		 * Function for using minimatch patterns to grab the files and render a list
		 */
		var categories = function(src, category) {

			var output = [];
			var output_str = "";
			var content;
			content = grunt.file.expand(src).map(function(path) {
				return {path: path};
			}).map(function(obj) {
				var FM = getFM(obj.path);
				output.push(FM);
			});

			output = _.filter(output, function(entry) {
				return _.contains(entry.categories, category);
			});

			output = _.sortBy(output, function(entry) {
				return entry.date;
			});

			_.each(output, function(entry) {
				output_str += '<li><a href="' + entry.url + '">' + entry.title + '</a></li>\n';
			});

			return output_str;
		};

		var getFM = function(src) {
			return yfm.extract(src).context;
		};

		/*
		 * categories helper
		 */
		Handlebars.registerHelper("categories", function(src, category) {
			return new Handlebars.SafeString(categories(src, category));
		});

	};
}).call(this);