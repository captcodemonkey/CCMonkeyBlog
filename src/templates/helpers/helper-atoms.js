(function() {
	module.exports.register = function(Handlebars, options) {

		var grunt  = require('grunt');
		var yfm = require('assemble-front-matter');
		path = require('path');

		/*
		 * Function for using minimatch patterns to grab the files and render a list
		 */
		var atoms = function(src) {
			var content;
			return content = grunt.file.expand(src).map(function(path) {
				return {path: path};
			}).map(function(obj) {

				var FM = getFM(obj.path);

				var filename = path.basename(obj.path, '.hbs').replace('helper-', '');


				return '<li><a href="' + FM.url + '">' + FM.title + '</a></li>' + '\n';
			}).join(grunt.util.normalizelf(grunt.util.linefeed));
		};

		var getFM = function(src) {
			return yfm.extract(src).context;
		};

		/*
		 * atoms helper
		 */
		Handlebars.registerHelper("atoms", function(src) {
			return new Handlebars.SafeString(atoms(src));
		});

	};
}).call(this);