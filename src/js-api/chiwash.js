// Echo's Chinese Ink Wash filter library 
// modified on 2014.Feb.2
// based on Echo's old Chines Ink Wash IOS code

ChinwashFilter = {

	greyscale: function(pixel) {
		var d = pixel.data;
		for (var i = 0; i < d.length; i+=4) {
					var r = d[i];
					var g = d[i+1];
					var b = d[i+2];
					var v = (r+g+b)/3;
					d[i] = d[i+1] = d[i+2] = v;

				}
		return pixel;
	},


	otsuThreshold: function(pixel){
		var histogram = new Array();
		for (var i = 0; i < 256; i++) {
			histogram[i] = 0;
		};
		var d = pixel.data;
		for (var i = 0; i < d.length; i+=4) {
					var r = d[i];
					var g = d[i+1];
					var b = d[i+2];
					var v = (r+g+b)/3;
					n = Math.round(v);
					histogram[n]+=1;
		}

		// // normalize the histogram
		// for (var i=0; i<256; i++) {
  //       	histogram[i]=histogram[i]/d.length;
  //   	}
  //   	console.log("histogram", histogram);
  //   	var w = pixel.width;
  //   	console.log("w",w);
  //   	var avg=0;
  //   	for (var i=0; i<256; i++) {
  //       	avg+=i*histogram[i];
  //  		 }
  //  		 console.log("avg",avg);
  //  		var threshold=0;
  //   	var maxVariance=0;
  //   	var wi=0, ui=0;
  //   	for (var i=0; i<256; i++) {
  //       	wi+=histogram[i];
  //      		ui+=i*histogram[i];
  //       	var t=avg*wi-ui;
  //       	var variance=t*t/(w*(1-w));
  //       	 console.log("variance",variance);

  //       		if (variance>maxVariance) {
  //           		maxVariance = variance;
  //           		threshold=i;
  //       		}
        	
  //   	}
  //   	console.log("wi", wi);
  //   	console.log("ui", ui);
    	
  		var sum = 0;
  		for (var i = 1; i < 256; ++i){
        	sum += i * histogram[i];
        }
        console.log('sum',sum);
        var sumB = 0;
	    var wB = 0;
	    var wF = 0;
	    var mB;
	    var mF;
	    var max = 0.0;
	    var between = 0.0;
	    var threshold1 = 0.0;
	    var threshold2 = 0.0;
	    for (var i = 0; i < 256; ++i) {
        	wB += histogram[i];
        	if (wB == 0)
            	continue;
        	wF = d.length - wB;
        	if (wF == 0)
            	break;
        	sumB += i * histogram[i];
        	mB = sumB / wB;
        	mF = (sum - sumB) / wF;
         	between = wB * wF * Math.pow(mB - mF, 2);
        	if ( between >= max ) {
            	threshold1 = i;
            if ( between > max ) {
                threshold2 = i;
            }
            max = between;            
        }
        threshold =  ( threshold1 + threshold2 ) / 2.0;
    }
		return threshold;

	},

	threshold: function(pixel) {
		// var threshold= ChinwashFilter.otsuThreshold(pixel);
		// console.log("otsuThreshold",threshold);
		var threshold = 128;
		var d = pixel.data;
		for (var i = 0; i < d.length; i+=4) {
					var r = d[i];
					var g = d[i+1];
					var b = d[i+2];
					var v = (r+g+b)/3;
					console.log()
					var n = v >= threshold ?  255 : 0;
					d[i] = d[i+1] = d[i+2] = n;
				}
		return pixel;
	},

};