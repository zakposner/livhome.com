var lhmExternal;

jQuery(document).ready(function($) {

	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	// 	Variables & Helper Functions
	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

	function LHManager() {
		// console.time('Initialization');

		this.mobileCutoff = 1000;

		this.state = {
			phoneNumber: '1-800-721-0118'
		}

		// Init

		// this._initMiniForms();	// No longer in use
		this._initAnnouncementBar();
		this._initDynamicPhoneNumbers();
		this._initBreadCrumbs();
		this._initContactFormRedirects();
		this._initGoogleAnalytics();

		// console.timeEnd('Initialization');
	}

	LHManager.prototype = $.extend({}, LHManager.prototype, {

		stringContains: function(string, substring) {
			return string.indexOf(substring) !== -1;
		},

		getWindowWidth: function() {
			return $(window).width();
		},

		onHomePage: function() {
			return $('body').hasClass('home');
		},

		buildLink: function(string) {
			return 'https://www.livhome.com/' + encodeURIComponent(string);
		},

		redirect: function(string, external) {
			if (external === true) {
				window.location = string
			} else {
				window.location = this.buildLink(string);
			}
		},

		onPage: function(string, strict) {
			if ( string[0] !== '/' ) string = '/' + string;
			if (strict) {
				return window.location.pathname === string;
			} else {
				return window.location.pathname.indexOf(string) !== -1;
			}
		},

		setCookie: function(name,value,days) {
		    var expires = "";
		    if (days) {
		        var date = new Date();
		        date.setTime(date.getTime() + (days*24*60*60*1000));
		        expires = "; expires=" + date.toUTCString();
		    }
		    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
		},

		getCookie: function(name) {
		    var nameEQ = name + "=";
		    var ca = document.cookie.split(';');
		    for(var i=0;i < ca.length;i++) {
		        var c = ca[i];
		        while (c.charAt(0)==' ') c = c.substring(1,c.length);
		        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		    }
		    return null;
		},

		removeBreadcrumbs: function() {
			$('#breadcrumbs').hide();
			$('.container-wrap').css({paddingTop: 0});
		},

		telReplace: function($link, href, cosmetic) {
			var _this = this;
			// If the element we got isnt a link, search for one inside
			if ( !$link.is('a') ) {
				$link = $link.find('a[href*="tel"]');
			}

			var keyWords = ['Call '];
			var telReplaced = false;

			// Replace the link href immediately
			$link.attr('href', href);

			// Determine if theres any special text to preserve, then replace link text
			$(keyWords).each(function(index, keyword) {
				if ( _this.stringContains( $link.text(), keyword ) ) {
					$link.text(keyword + cosmetic);
					telReplaced = true;
					return false;
				}
			});

			if ( !telReplaced ) $link.text(cosmetic);
		},


		// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
		// 	Init
		// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

		/**
		*	Mini Contact Form Functionality
		**/
		_initMiniForms: function() {

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
		},

		/**
		*	Custom GA Event Tracking
		**/
		_initGoogleAnalytics: function() {

			var _this = this;

			// Landing Page Based Conversion Tracking
			// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
			if ( this.onPage('thank-you/', true) ) {
				// console.log('Firing Thank You Page gtag');
				gtag('event', 'conversion', {'send_to': 'AW-783474288/8TiRCMn1w5ABEPC8y_UC'});
			}
			else if ( this.onPage('careers-thank-you/', true) ) {
				// console.log('Firing Careers Thank You Page gtag');
				gtag('event', 'conversion', {'send_to': 'AW-783474288/9wSnCIC4ypABEPC8y_UC'});
			}

			// Analytics Click to Call Tracking
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

		  	// Google Ads Phone Number Config
		  	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
		  	gtag('config', 'AW-783474288/g02iCO_rw5ABEPC8y_UC', { 'phone_conversion_number': _this.state.phoneNumber });
		},

		/**
		*	Contact Form 7 Redirects
		**/
		_initContactFormRedirects: function() {
			document.addEventListener( 'wpcf7mailsent', function( event ) {
				if ( this.onPage('contact/', true) ) {								// Contact Page Form
					this.redirect('thank-you'); 
				}
				else if ( this.onPage('caregiver-jobs/apply/', true) ) { 			// Caregiver Application
					this.redirect('careers-thank-you'); 
				}
				else if ( this.onPage('partnerships-form/', true) ) {				// Parterships Form
					this.redirect('thank-you-partnerships');
				}
				else if ( this.onPage('careers-form/', true) ) {					// Careers Form
					this.redirect('careers-thank-you-2'); 
				}
				else if ( this.onPage('life-care-management/') ) {					// Download Life Care Management Guide
					this.redirect('download-life-care-management');
				}
				else if ( this.onPage('in-home-care/') ) {							// Download In Home Care Guide
					this.redirect('download-in-home-care');
				}
				else {																// All other contact forms
					this.redirect('thank-you');
				}
			}, false );
		},

		/**
		*	Announcement Bar close & cookie functionality
		**/
		_initAnnouncementBar: function() {

			if ( !$('.lh-announcement-bar').length ) return;

			var _this = this;

			var key = 'lh_announcement_bar';						// announcement bar cookie key
			var days = 60;											// number of days to keep the cooie
			var $header = $('#header-outer');						// header elem which gets the active class to reveal the announcement
			var $ancClose = $('.lh-announcement-bar .fa-close');	// close announcement trigger elem
			var activeClass = 'lh-announcement-bar-active';

			// If the user hasn't aready dismissed the announcement
			var ancCookie = this.getCookie(key);
			if ( ancCookie === null ) {
				$header.addClass(activeClass);
			}

			// Handle announcement close click
			$ancClose.click(function(event) {
				$header.removeClass(activeClass);
				_this.setCookie(key, true, days);
			});
		},

		/**
		*	Dynamic, ocation-based phone numbers
		**/
		_initDynamicPhoneNumbers: function() {

			var _this = this;

			$callLink = $('.lh-header-call-link');
			$footerCallLink = $('#footer-widgets .custom-html-widget a[href*="tel"]');

			var customLinks = [
				{ 'page': 'chicago', 		'href': 'tel:1-847-470-1703', 'cosmetic': '(847) 470-1703' },
				{ 'page': 'east-bay', 		'href': 'tel:1-925-296-0406', 'cosmetic': '(925) 296-0406' },
				{ 'page': 'houston', 		'href': 'tel:1-713-622-6200', 'cosmetic': '(713) 622-6200' },
				{ 'page': 'los-angeles', 	'href': 'tel:1-323-933-5880', 'cosmetic': '(323) 933-5880' },
				{ 'page': 'orange-county', 	'href': 'tel:1-949-794-9470', 'cosmetic': '(949) 794-9470' },
				{ 'page': 'san-diego', 		'href': 'tel:1-619-544-1622', 'cosmetic': '(619) 544-1622' },
				{ 'page': 'san-jose', 		'href': 'tel:1-650-967-3326', 'cosmetic': '(650) 967-3326' },
				{ 'page': 'santa-barbara', 	'href': 'tel:1-805-687-8766', 'cosmetic': '(805) 687-8766' },
				{ 'page': 'riverside', 		'href': 'tel:1-951-359-4434', 'cosmetic': '(951) 359-4434' },
				{ 'page': 'careers', 		'href': 'tel:1-800-721-0118', 'cosmetic': '(800) 721-0118' }
			];

			// If we find ourselves on a location page
			$(customLinks).each(function(index, link) {
				if ( window.location.pathname.indexOf(link.page) !== -1 ) {

					// Set Footer Link
					_this.telReplace($footerCallLink, link.href, link.cosmetic);

					// TODO: set the rest of the footer contact info

					// Set cookie for dynamic numbers across the site
					_this.setCookie(
						'lh-phone-number',
						link.href + '|' + link.cosmetic,			
						1 // days
					);

					return false; // end the search loop
				}		
			});


			// Look for the phone number cookie
			// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
			var cookieVal = this.getCookie('lh-phone-number');

			if (cookieVal !== null) {
				var href = cookieVal.split('|')[0];
				var linkText = cookieVal.split('|')[1];

				this.state.phoneNumber = href.replace('tel:', '');
				console.log(this.state);

				// First replace the header link
				var $headerTel = $('header#top .sf-menu > .menu-item > a[href*="tel"]');
				this.telReplace($headerTel, href, linkText);

				// And the mobile header link
				var $mobileTel = $('#slide-out-widget-area .menu > .menu-item > a[href*="tel"]');
				this.telReplace($mobileTel, href, linkText);

				// And the mobile call link icon
				$callLink.attr('href', href);

				// Replace anywhere the class was used
				$('.livhome-dynamic-tel').each(function(index, link) {
					_this.telReplace($(link), href, linkText);
				});
			}
		},

		/**
		*	Remove breadcrumbs on certain pages
		**/
		_initBreadCrumbs: function() {
			if ( $('.livhome-remove-breadcrumbs').length ) this.removeBreadcrumbs();
		}


	});

	var lhm = new LHManager();
	// lhmExternal = new LHManager(); // for debugging


	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	// 	Multi-Page Forms
	// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

	/**
	*	SETUP
	*
	*	1. In the form builder, wrap the form fields in page divs with
	*		- .multiform__part class
	*		- data-multiform-part="" numbering from 0 to n
	*		- data-multiform-name for status bar names
	*
	*	2. When you include the form on a page, add the .multiform__wrap
	*		class to its container (does not have to be its direct parent)	
	*
	**/
	function MultiForm(container) {
		var _this = this;

		this.$container = $(container);
		this.$form = this.$container.find('.wpcf7');
		this.$pages = this.$container.find('.multiform__part');

		this.state = {
			pageNumber: this.$pages.eq(-1).data('multiform-part'),
			currentPage: 0
		}

		this.activeClass = 'multiform__part--active';
		this.statusClass = 'multiform__status-name';
		this.activeStatusClass = 'multiform__status-name--active'

		// Init
		// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

		this.initPages();

		// Event Handlers
		// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

		// Click Events
		this.$container.on('click', function(e) {
			console.log(e);
			var $eventTarget = $(e.target);

			// On Control Click
			if ( $eventTarget.hasClass('multiform__next') ) {
				_this.nextPage();
			}
			else if ( $eventTarget.hasClass('multiform__prev') ) {
				_this.prevPage();
			}
		});

		// Change Events
		this.$container.on('change', function(e) {
			var $eventTarget = $(e.target);

			// If a user changes an invalid form field, mark it as valid for now
			// and the field will be actually rechecked on submit again
			if ( $eventTarget.hasClass('wpcf7-not-valid') && $eventTarget.val().length ) {
				$eventTarget.removeClass('wpcf7-not-valid');
				$eventTarget.siblings('.wpcf7-not-valid-tip').hide();
			}
		});

		// Form Error Events
		this.$container.on('wpcf7invalid', function(e) {
			_this.$pages.each(function(i, page) {
				var pageErrors = $(page).find('.wpcf7-not-valid');

				// Move to earliest page with errors
				if (pageErrors.length) {
					_this.setActivePage(i);
					return false;
				}
			});
		});
	}

	MultiForm.prototype = $.extend({}, MultiForm.prototype, {

		initPages: function() {
			var _this = this;

			// Prepend Status Bar
			this.$form.prepend( 
				$('<div class="multiform__status-wrap"><div class="multiform__status"><div class="multiform__status-bar"></div></div></div>') 
			);

			this.$status = this.$container.find('.multiform__status-bar');
			this.$statusWrap = this.$container.find('.multiform__status-wrap')

			// Append page controls
			var nextButton = '<span class="multiform__next cta-secondary">Next</span>';
			var prevButton = '<span class="multiform__prev cta-secondary">Previous</span>';

			this.$pages.each(function(i, page) {

				// Controls
				// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

				// First Page
				if (i === 0) {
					$(page).append( $(nextButton) );
				}
				// Last Page
				else if (_this.$pages.length === i + 1) {
					$(page).append( $(prevButton) );
				}
				// Every Other Page
				else {
					$(page).append( $(prevButton) );
					$(page).append( $(nextButton) );					
				}

				// Status Bar
				// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

				var nameString = (i + 1) + '/' + (_this.state.pageNumber + 1);
				var pageName = $(page).data('multiform-name');

				nameString = pageName // if we actually have a name
					? nameString + ' - ' + pageName
					: nameString;

				var progress = (i * 100) / _this.state.pageNumber;

				var $statusName = $('<span class="multiform__status-name" data-multiform-page="' + i + '" style="left:' + progress + '%;">' + nameString + '</span>');
				_this.$statusWrap.append($statusName);

			});

			this.setActivePage(0, true);
		},

		setActivePage: function(pageNumber, abortZoom) {
			var _this = this;

			this.state.currentPage = pageNumber;

			// Ensure every page is off
			this.$pages.removeClass(this.activeClass);

			// Turn on the requested page
			this.$container
				.find('.multiform__part[data-multiform-part="' + pageNumber + '"]')
				.addClass(this.activeClass);

			this.$container.data('multiform-active-page', pageNumber);

			// Set status bar
			this.setStatusBar(pageNumber);

			// Zoom view to top of form
			if (abortZoom !== true) {
				$('html,body').animate({
				   scrollTop: _this.$form.offset().top
				});
			}
		},

		nextPage: function() {
			if (this.state.currentPage < this.state.pageNumber) {
				this.setActivePage(++this.state.currentPage);
			} else {
				console.log('Cannot call nextPage, already on the last page.');
			}			
		},

		prevPage: function() {
			if (this.state.currentPage > 0) {
				this.setActivePage(--this.state.currentPage);
			} else {
				console.log('Cannot call prevPage, already on the first page.');
			}
		},

		setStatusBar: function(pageNumber) {
			var _this = this;

			// Animate the status bar
			var page = pageNumber || this.state.currentPage;
			var progress = (page * 100) / this.state.pageNumber;
			var newOffset = (100 - progress) + '%';
			if (newOffset === '100%') newOffset = '98%'; // make it look like a bit of progress
			this.$status.css({ right: newOffset });

			// Show the right status text
			this.$container.find('.' + _this.statusClass).removeClass(_this.activeStatusClass);
			this.$container.find('.' + _this.statusClass + '[data-multiform-page="' + pageNumber + '"]').addClass(_this.activeStatusClass);
		}

	});

	// Init MultiForm
	window.multiformInstances = [];
	$('.multiform__wrap').each(function() {
		window.multiformInstances.push( new MultiForm(this) );
	});

});
