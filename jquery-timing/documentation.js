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
		
		$('tr:odd').addClass('odd');
});
