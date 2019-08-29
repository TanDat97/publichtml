$(function () {

	if( $('.is-withSearch').length ){
        // Hide Header on on scroll down 
	    var didScroll; 
	    var lastScrollTop = 0; 
	    var delta = 5; 
	    var navbarHeight = $('.main-header').outerHeight();
	    var container = $('.main-container');

	    container.scroll(function(event){ 
	    	didScroll = true; 
	    }); 

	    setInterval(function() { 
	    	if (didScroll) { 
	    		hasScrolled(); 
	    		didScroll = false; 
	    	} 
	    }, 250);


	    function hasScrolled() {
			var st = container.scrollTop();
			var main = $('.main');

			// Make sure they scroll more than delta 
			if(Math.abs(lastScrollTop - st) < delta) return; 
			// If they scrolled down and are past the navbar, add class .nav-up. 
			// This is necessary so you never see what is "behind" the navbar. 
			if (st > lastScrollTop && st > navbarHeight) { 
				// Scroll Down 
				main.removeClass('showSearch'); 
			} else {
				// Scroll Up 
				if(st + container.height() < $(".main-content").height()) {
            		main.addClass('showSearch');
            	}
			}

			lastScrollTop = st;
		}
    }
    
    if( $('.is-withPeriod').length ){
        // Hide Header on on scroll down 
	    var didScroll; 
	    var lastScrollTop = 0; 
	    var delta = 5; 
	    var navbarHeight = $('.main-header').outerHeight();
	    var container = $('.main-container');

	    container.scroll(function(event){ 
	    	didScroll = true; 
	    }); 

	    setInterval(function() { 
	    	if (didScroll) { 
	    		hasScrolled(); 
	    		didScroll = false; 
	    	} 
	    }, 250);


	    function hasScrolled() {
			var st = container.scrollTop();
			var main = $('.main');

			// Make sure they scroll more than delta 
			if(Math.abs(lastScrollTop - st) < delta) return; 
			// If they scrolled down and are past the navbar, add class .nav-up. 
			// This is necessary so you never see what is "behind" the navbar. 
			if (st > lastScrollTop && st > navbarHeight) { 
				// Scroll Down 
				main.removeClass('showPeriod'); 
			} else {
				// Scroll Up 
				if(st + container.height() < $(".main-content").height()) {
            		main.addClass('showPeriod');
            	}
			}

			lastScrollTop = st;
		}
    }
});