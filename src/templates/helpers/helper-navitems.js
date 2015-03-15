/*
 * Function for using minimatch patterns to grab the files and render a list
 */
var navitems = function(src) {
	var content;
	return content = grunt.file.expand(src).map(function(path) {
		return {path: path};
	}).map(function(obj) {
		var heading = path.basename(obj.path, '.md.hbs').replace('helper-', '');
		return '<li><a href="#' + heading + '">' + heading + '</a></li>\n';
	}).join(grunt.util.normalizelf(grunt.util.linefeed));
};

/*
 * nav helper
 */
Handlebars.registerHelper("navitems", function(src) {
	return new Handlebars.SafeString(navitems(src));
});