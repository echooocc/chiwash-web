$(function() {

	var	pic = $('#pic_holder'),
		filters = $('#filters li a'),
		filter_holder = $('#filter_holder');
		temp = null;
		

	// Use the fileReader plugin to listen for file drag and drop on the pic_holder div

	pic.fileReaderJS({
		on:{
			load: function(e, file){

				$('#info').hide();
				var img = $('<img>').appendTo(pic);
				pic.find('canvas').remove();
				pic.css({'border-width':'0px'});
		
				img.load(function(){

					//proportional resize the image
					img.css({'max-width': '100%',
						 'max-height': '100%',
						});

					var top =0;
					//vertical align the image in center
					if(this.height<400){
						top= (400 - this.height)/2;

					// img.css({
					// 	marginTop: top,
					// 	});
					}

					//draw the resized image on canvas 
					temp = $('<canvas>');
					var tempContext = temp[0].getContext('2d');

					temp.attr({
						width: this.width,
						height: this.height+top
					});

					tempContext.drawImage(this, 0, top, this.width, this.height);

					img.remove();

					filter_holder.fadeIn();
					//set default select first one
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


	//scroll bar actions
	filters.click(function(e){
		e.preventDefault();

		var f = $(this);

		//apply filter once
		if(f.is('.active')){
			return false;
		}

		filters.removeClass('active');
		f.addClass('active');

		//clone the original canvas
		var clone = temp.clone();

		//draw image on the canvas
		clone[0].getContext('2d').drawImage(temp[0],0,0);

		//add canvas show on the div
		pic.find('canvas').remove().end().append(clone);

		//if effects exits in Caman filters
		var effect = $.trim(f[0].id);
		// console.log(effect);

		Caman(clone[0], function () {
			if( effect in this){
				this[effect]();
				this.render();
			}
			
		});
	});

	//modify scroll bar experience
	filter_holder.find('ul').on('mousewheel',function(e, delta){

		this.scrollLeft -= (delta * 50);
		e.preventDefault();

	});



});
