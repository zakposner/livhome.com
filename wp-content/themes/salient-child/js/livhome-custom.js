var lhmExternal;

jQuery(document).ready(function($) {

	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	// Variables & Helper Functions
	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

	function LHManager() {

		this.mobileCutoff = 1000;

		// Add helper functions as methods to this object

		this.stringContains = function(string, substring) {
			return string.indexOf(substring) !== -1;
		};

		this.getWindowWidth = function() {
			return $(window).width();
		};

		this.onHomePage = function() {
			return $('body').hasClass('home');
		};

		this.buildLink = function(string) {
			return 'https://www.livhome.com/' + encodeURIComponent(string);
		};

		this.redirect = function(string, external) {
			if (external === true) {
				window.location = string
			} else {
				window.location = this.buildLink(string);
			}
		}

		this.onPage = function(string, strict) {
			if ( string[0] !== '/' ) string = '/' + string;
			if (strict) {
				return window.location.pathname === string;
			} else {
				return window.location.pathname.indexOf(string) !== -1;
			}
		}

	}

	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	// Init
	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

	var lhm = new LHManager();
	lhmExternal = new LHManager();

	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	// Google Analytics
	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

	$('a[href^="tel"]').click(function() {
	    try {
	    	console.log('communicating with google analytics..');
	    	// send reference to the phone number clicke
	    	var target = $(this).attr('href').replace('tel:', '');
	      	 gtag('event', 'clicks', {
		        'event_category' : 'phone',
		      	'event_action': 'click',
		        'event_label' : target
		      });
	    }
	    catch(e) {
	      	console.log('Google Analytics Error:', e);
	    }
  	});

  	// form redirects - Contact Form 7
	document.addEventListener( 'wpcf7mailsent', function( event ) {
		if ( lhm.stringContains(window.location.href, 'contact') ) lhm.redirect('thank-you'); // Contact Form
		if ( lhm.stringContains(window.location.href, 'apply') )  lhm.redirect('careers-thank-you'); // Apply Form
	}, false );

  	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	// Mini Forms
	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

	(function() {

	    // DOM references
	    var $miniForm = $('.looking-form'),
	        $miniSelect = $('.looking-select'),
	        $miniSubmit = $('.looking-form .cta-primary');

		// Event Handlers
	    function handleSelection() {
	    	if ( 'null' !== $miniSelect.val() ) {
	        	$miniSubmit.prop('disabled', false);
	      	} else {
	        	$miniSubmit.prop('disabled', true);
	      	}
	    }
	    function handleSubmit(e) {
	    	e.preventDefault(); // stop browser refresh
	      	var carefor = $('.looking-select').val(); // pull desired value from $miniform
	      	carefor = encodeURIComponent(carefor); // encode value for query string
	      	window.location.href= 'https://www.livhome.com/contact?carefor=' + carefor; // send data to contact form
	    }

	    // Init
	    $miniSelect.change(handleSelection);
	    $miniForm.submit(handleSubmit);

	})();

	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	// Header Click to Call Link
	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

	// Set custom click to call link based on the page
	(function() {
		$callLink = $('.lh-header-call-link');
		var customLinks = [
			{ 'page': 'chicago', 'href': 'tel:1-847-470-1703' },
			{ 'page': 'east-bay', 'href': 'tel:1-925-296-0406' },
			{ 'page': 'houston', 'href': 'tel:1-713-622-6200' },
			{ 'page': 'los-angeles', 'href': 'tel:1-323-933-5880' },
			{ 'page': 'orange-county', 'href': 'tel:1-949-794-9470' },
			{ 'page': 'san-diego', 'href': 'tel:1-619-544-1622' },
			{ 'page': 'san-jose', 'href': 'tel:1-650-967-3326' },
			{ 'page': 'santa-barbara', 'href': 'tel:1-805-687-8766' },
			{ 'page': 'riverside', 'href': 'tel:1-951-359-4434' },
			{ 'page': 'careers', 'href': 'tel:1-800-721-0118' }
		];
		$(customLinks).each(function(index, link) {
			if (lhm.onPage(link.page)) { 
				$callLink.attr('href', link.href);
				return false; // end the loop
			}		
		});
	})();

});
