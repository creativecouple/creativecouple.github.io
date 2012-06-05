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
		$('tr:odd').addClass('odd');
		
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
		
		$('pre, .example').each(function(){
			var fiddle = $(this).data('fiddle');
			if (fiddle) {
				$('<a class="fiddle" title="see this example on jsFiddle">&nbsp;copy code</a>').attr('href', fiddle).appendTo(this);
			}
		});
});
