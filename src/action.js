$(function() {

	var	pic = $('#pic_holder'),
		filters = $('#filters li a'),
		filter_holder = $('#filter_holder');

	// Use the fileReader plugin to listen for file drag and drop on the pic_holder div

	pic.fileReaderJS({
		on:{
			load: function(e, file){

				$('#info').hide();
				var img = $('<img>').appendTo(pic);
		
				img.load(function(){

					//proportional resize the image
					img.css({'max-width': '100%',
						 'max-height': '100%',
						});

					// console.log(this.width);
					// console.log(this.height);
						
					//vertical align the image in center
					if(this.height<500){
						var top= (500 - this.height)/2;

					img.css({
						marginTop: top,
						});
					}

					filter_holder.fadeIn();

					// Trigger the default "normal" filter
					filters.first().click();

				});
				
				img.attr('src', e.target.result);			
			},

			//be sure the file is image
			beforestart: function(file){
				return /^image/.test(file.type);
			},

		},
	});

	
	

});
