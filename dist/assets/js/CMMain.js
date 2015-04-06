/* CMMain.js
 * main singleton
 */
var CMMain = (function ($) {
	function CMMain($) {
		//variables

		//I would do anything for scope
		var self = this;


		self.initialize = function (options) {

			self.$mobileToggle = $("#mobile-toggle");
			self.$mobileMenu = $(".mobile-menu .mobile-navigation");

			self.$mobileToggle.on("click.ccm", function(event) {
				$(this).children("i").first().toggleClass("fa-bars").toggleClass("fa-close");
				self.$mobileMenu.slideToggle();
				event.preventDefault();
			});
			return false;
		};
	}
	var instance;
	return {
		getInstance: function ($) {
			if (instance == null) {
				instance = new CMMain($);
				// Hide the constructor so the returned objected can't be new'd...
				instance.constructor = null;
			}
			return instance;
		}
	};
})($);