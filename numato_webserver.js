// http://localhost:8080/
// node numato_webserver.js



var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http) //require socket.io module and pass the http object (server)

var port = "COM4";
var SerialPort = require('serialport');
var portObj = new SerialPort(port,{baudRate:19200});
var relayString = ""


var gpio2 = "0"

//Set pin zero up for 3.3 v signal power supply
portObj.write("gpio set 0\r" , function(err, results){
	if(err){
		console.log('Failed to write to port: '+ error);
	}
});	


http.listen(8080); //listen to port 8080

function handler (req, res) { //create server
  fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });
}

	
	
io.sockets.on('connection', function (socket) {// WebSocket Connection

    //send value of GPIO2 to browser
	setInterval(function(){  socket.emit('light', gpio2 );  }, 100);
	
	
	//information from the browser
	var lightvalue = 0; 
	socket.on('light', function(data) { 
		lightvalue = data;
		toggleRelay(lightvalue);
	})
  });


//Turn relay on or off
function toggleRelay(state){	
	relayString = state?"relay on 0\r":"relay off 0\r"
	portObj.write(relayString , function(err, results){
		if(err){
			console.log('Failed to write to port: '+ error);
		}
	});
}


//Send request to Numato board 
//for GPIO 2 status every .1 seconds
setInterval(function(){  
		portObj.write("gpio read 2\r" , function(err, results){
			if(err){
				console.log('Failed to write to port: '+ error);
			}
		});	
	}, 100);


//Read data sent from Numato board
//If data is from request for status of GPIO2,
//set variable gpio2 equal to status
portObj.on('data', function(data){
	let dataArray = String(data).split("\n\r")
	if ( dataArray[0].indexOf( "gpio read 2" ) >= 0){
		gpio2 = dataArray[1];
	}
});


/*
Wiring to Numato board
							resistor
GPIO0 ( 3.3 V )------------/\/\/---------------------------------GPIO2		
									|
									\
									 \  switch
									|
									|
GND ________________________________|

When switch closes circle in browser user interface turns red



<!-- Create environment, assuming node is installed -->
<!-- npm install socket.io --save -->
<!-- npm install serialport -->
<!-- On win machine, allow an app through windows firewall.  Check node.js boxes -->

<!-- start server -->
<!-- node numato_webserver.js -->

User interfact HTML file must be in public/index.html

<!-- Open web page -->
<!-- http://localhost:8080/ -->
<!-- http://192.168.1.15:8080/ -->

*/