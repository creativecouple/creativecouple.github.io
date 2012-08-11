$(document).ready(function(){
		// help the user with little tooltips
		var abbreviation_map = {
				tic: 'Timed Invocation Chain',
				fxq: 'Effects Queue'
		}
		$('abbr').each(function(){
			var $this = $(this);
			$this.attr('title', $this.attr('title') || abbreviation_map[$this.text()]);
		});
		
		// make tables look nice		
		$('tr:even').addClass('even');
		
		// make address chaos clickable
		$('address').click(function(){
			var targetAddress = [];
			$(this).children().each(function(){
				$.each($(this).text(), function(i){
					targetAddress[i] = (this == ' ') ? targetAddress[i] : this;
				});
			});
			window.location = 'mailto:'+targetAddress.join('');
		});
		
		$('a.jsfiddle').each(function(){
			$(this).text('​').attr({title:'see this example on jsFiddle.net', target:'_blank'}).addClass('fiddle').appendTo($(this).next('.highlight').children('pre'));
		});
		
		$('.highlight .nx').each(function(){
			$(this).addClass($(this).text());
		});
		
		$(window).scroll(function(){
			$('#navigation').css('top',Math.max($(window).scrollTop() - 60 - $('#header').outerHeight(), 0));
		});
		
		$('a').each(function(){
			var hovering = $(this).data('hover');
			if (hovering) {
				$(this).mouseover($).$(hovering).mouseover()
				._.mouseout($).$(hovering).mouseout();
			}
		});
		
		var localAPI = ['wait','unwait','join','animate','load','all','until','bind','on','one','live','delegate','each','repeat','unrepeat','$','_','then'];
		
		$($('.highlight .nx').get().reverse()).each(function(){
			var $this = $(this);
			if (!$this.prev().text().match(/\.$/) || !$this.next().text().match(/^\(/)) {
				return;
			}
			
			var text = $this.text();
			var $highlighted = $this;
			
			$.each({each:'all', repeat:'until'}, function(key,value){
				if (text == value) {
					for (n = $highlighted; n.length && (n.is(':not(.p)') || n.text().substr(0,2).indexOf(')') < 0); n=n.next()) {
						$highlighted = $highlighted.add(n);
					}
					$this.data('high', $highlighted.add(n));
					return false;
				}
				if (text == key) {
					for (n = $highlighted; n.length && (n.is(':not(.nx)') || ['all','until','_'].indexOf(n.text())<0); n=$highlighted.last().next()) {
						$highlighted = $highlighted.add(n).add(n.data('high'));
					}
					if (n.text() == value) {
						$highlighted = $highlighted.add(n.data('high'));
						n.data('high', $highlighted);
					}
					$this.data('high', $highlighted);
					return false;
				}
			});
			$this.toggleClass((localAPI.indexOf(text) >= 0) ? 'localAPI' : 'jqueryAPI', ['random','floor','doSome','doThat','doLater','jQueryStuff','doSomething','foo','bar','foobar','someMethod','doThis','doThisNow','doLater','doNow','overAndOver','doThisLater'].indexOf(text)<0);
		})
		.on('mouseover mouseout').each().data('high').all().toggleClass('high');
		
		$('.localAPI').each(function(){
			var title = $(this).text();
			var text = title.replace(/[.();]/g,'');
			if ($(this).prev().text() == '.' && $(this).prev().prev().text() == '$') {
				text = 'jQuery.'+text;
			}
			var url = '/jquery-timing/api/#'+text;
			$(this).text('').append($('<a>').attr({href:url, title:'see API'}).text(title));
		});
		$('.jqueryAPI').each(function(){
			var title = $(this).text();
			var text = title.replace(/[.();]/g,'');
			if ($(this).prev().text() == '.' && $(this).prev().prev().text() == '$') {
				text = 'jQuery.'+text;
			}
			var url = 'http://api.jquery.com/'+text+'/';
			$(this).text('').append($('<a>').attr({href:url, title:'see jQuery API', target:'_blank'}).text(title));
		});
});
