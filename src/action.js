$(function() {

	var	maxWidth = 500,
		maxHeight = 500,
		pic = $('#pic_holder'),
		originalCanvas = null,
		filters = $('#filters li a'),
		filter_holder = $('#filter_holder');

	// Use the fileReader plugin to listen for file drag and drop on the pic_holder div

	pic.fileReaderJS({
		on:{
			load: function(e, file){

				//good for image file under 1mb way too slow

				var img = $('<img>').appendTo(pic_holder);
				Caman(img[0], function(){
					this.resize({
						height: 500,
						width: 500,

					});
					this.render();
				});

			
				img.attr('src', e.target.result);


			},

			beforestart: function(file){
				return /^image/.test(file.type);
			},

		},
	});

	
	

});
