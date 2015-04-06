var cm_main;

var equalheight = function(container){

	var currentTallest = 0,
		currentRowStart = 0,
		rowDivs = new Array(),
		$el,
		topPosition = 0;
	$(container).each(function() {
		var currentDiv = 0;
		$el = $(this);
		$($el).height('auto');
		topPostion = $el.position().top;

		if (currentRowStart != topPostion) {
			for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
				rowDivs[currentDiv].height(currentTallest);
			}
			rowDivs.length = 0; // empty the array
			currentRowStart = topPostion;
			currentTallest = $el.height();
			rowDivs.push($el);
		} else {
			rowDivs.push($el);
			currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
		}
		for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			rowDivs[currentDiv].height(currentTallest);
		}
	});
};

$(function(){
	//get singleton instance
	cm_main = CMMain.getInstance($);
	cm_main.initialize({

	});

	var $menu = $("div.navigation");
	var menuPos = $menu.offset().top;

	//make boxes things equal height
	$(window).load(function() {
		equalheight('.highlights .highlight-block');
	});

	$(window).resize(function(){
		equalheight('.highlights .highlight-block');
	});

	$(window).on("scroll", function() {


		if($(this).scrollTop() >= menuPos) {

			if( !$menu.hasClass("sticky") ) {
				$menu.addClass('sticky');
			}
		} else {
			if( $menu.hasClass("sticky") ) {
				$menu.removeClass('sticky');
			}
		}
	});
});