define([
          'jquery',
          'handlebars',
          'bootstrap.min',
          'jquery.ui.widget',
          'jquery.iframe-transport',
          'jquery.fileupload',
          /*
          'canvas-to-blob.min',
          'load-image.all.min',
          'jquery.fileupload-process',
          'jquery.fileupload-image',
          'jquery.fileupload-audio',
          'jquery.fileupload-video',
          'jquery.fileupload-validate',
          */
          'app/common'
       ], function($, handlebars){
	
	return {
		boardmain: function(){
			var moduleObj = this;
			  $('#content').load('sub/bbs01_free_list.html');
			  $('#freeBoard').click(function(event) {
			    event.preventDefault();
			    $('#content').load('sub/bbs01_free_list.html');
			  });
			  $('#reportBoard').click(function(event) {
			    event.preventDefault();
			    $('#content').load('sub/reportboard.html');
			  });
			  $('#jobBoard').click(function(event) {
				event.preventDefault();
				$('#content').load('sub/jobboard.html');
			  });			  
			  $('#lectureEvalBoard').click(function(event) {
				  event.preventDefault();  
				  window.open('lecture_evaluation.html', '_blank', 'width=730, height=750, toolbar=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no' );
			  });
			  $('#inquire').click(function(event) {		  	  
		      event.preventDefault();  
					window.open('lecture_evaluation_inquire.html', '_blank', 'width=730, height=750, toolbar=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no' );
			  });
			  
		}
					
	};
});













