var express = require('express')
  , router = express.Router(),
port = process.env.PORT || 3000;


var server = require( "http" ).createServer( express() );
var io = require( "socket.io" )( server );
var five = require("johnny-five"),
board = new five.Board({ port: "COM4" });

	var led;
board.on("ready", function() {
	  // Create an Led on pin 13
	  led  = new five.Led(13);
		led.off();
	});



server.listen(port, "127.0.0.1");

io.sockets.on('connection',function(socket){

console.log("Connected: " + new Date());

socket.on('dnevna_soba', function(data) {
	if(data.status){
		led.on();
	}else{		
		led.off();
	}
	io.sockets.emit('svetlo',{status:data.status});
	
	});

});

router.use('/users', require('./users'))

router.get('/', function(req, res) {	
  res.render('index')
})

module.exports = router