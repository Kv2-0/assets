(function($){
	function injector(t, splitter, klass, after) {
		var text = t.text()
		, a = text.split(splitter)
		, inject = '';
		if (a.length) {
			$(a).each(function(i, item) {
				inject += '<span class="'+klass+(i+1)+'" aria-hidden="true">'+item+'</span>'+after;
			});
			t.attr('aria-label',text)
			.empty()
			.append(inject)

		}
	}


	var methods = {
		init : function() {

			return this.each(function() {
				injector($(this), '', 'char', '');
			});

		},

		words : function() {

			return this.each(function() {
				injector($(this), ' ', 'word', ' ');
			});

		},

		lines : function() {

			return this.each(function() {
				var r = "eefec303079ad17405c889e092e105b0";
				// Because it's hard to split a <br/> tag consistently across browsers,
				// (*ahem* IE *ahem*), we replace all <br/> instances with an md5 hash
				// (of the word "split").  If you're trying to use this plugin on that
				// md5 hash string, it will fail because you're being ridiculous.
				injector($(this).children("br").replaceWith(r).end(), r, 'line', '');
			});

		}
	};

	$.fn.lettering = function( method ) {
		// Method calling logic
		if ( method && methods[method] ) {
			return methods[ method ].apply( this, [].slice.call( arguments, 1 ));
		} else if ( method === 'letters' || ! method ) {
			return methods.init.apply( this, [].slice.call( arguments, 0 ) ); // always pass an array
		}
		$.error( 'Method ' +  method + ' does not exist on jQuery.lettering' );
		return this;
	};

})(jQuery);



$(document).ready(function(){
			
			$('.my-countdown').countdown({
				until: $.countdown.UTCDate(
					-5, 2017, 3, 11, 0, 0, 0
				)
			});
		

		$('#world-premiere .heading h2').lettering();
		$('#world-premiere .heading h1').lettering('words');

		var tl1 = new TimelineMax();

	var text1 = $('#world-premiere .heading [class^="char"]').toArray();
	var word1 = $('#world-premiere .heading [class^="word"]').toArray();

		tl1.staggerFrom(text1, .5, {autoAlpha: 0, }, .1).
		staggerFrom(word1, .5, {autoAlpha: 0}, .2).
      from('.my-countdown', 1, {scale: 2, autoAlpha: 0,}).
		to('.overlay', 1.5, {backgroundColor: "rgba(0,0,0,.1)"},"+=.75");

		});