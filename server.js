var express = require('express');
var app = express();
var request = require('request');
//var angular = require('angular') ;
app.use(express.static(__dirname + '/public')); 		// set the static files location


app.get('/api/conference', function(req, res){
	var url = "https://registration.gputechconf.com/cubehenge/json.php/GTC.MobileGuestServices.getSessions/GTC%202015/true";
	request(url, function(err, resp, body) {
	    if (!err && resp.statusCode == 200) {			
			res.json(JSON.parse(body));
	    }else{
	    	//error handling
	    }
		
	});
	/* 
	 fs = require('fs')
	 var body = fs.readFileSync(__dirname + '/public/' + 'input001.txt', 'utf8');
	res.json(JSON.parse(body));*/
});

app.listen(8081);

// Console will print the message
console.log('Server running at http://localhost:8081/');