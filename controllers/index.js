var express = require('express')
  , router = express.Router(),
port = process.env.PORT || 3000;


var http = require( "http" ).createServer( express() );
var io = require( "socket.io" )( http );
http.listen(port, "127.0.0.1");

io.sockets.on('connection',function(socket){

console.log("jep");
socket.on('dnevna_soba',function(data) {
	console.log(data);
	
	});

});

router.use('/users', require('./users'))

router.get('/', function(req, res) {	
  res.render('index')
})

module.exports = router