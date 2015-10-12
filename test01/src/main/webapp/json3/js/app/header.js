define(['jquery'], function($) {
	
	$('#home-main').click(function(event) {
		event.preventDefault();
		$('#content').load('sub/default_content.html');
	});

	
});
