const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);



const bodyParser = require('body-parser');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/flightcreator', (req, res) => {
  res.sendFile(__dirname + '/flight_creator.html');
});

/*
io.on('connection', (socket) => {
  console.log('a user connected');
  	queryStackOverflow().then(finalResult => {
		console.log('done');
		socket.emit('urls', finalResult);
  
})
});
*/
server.listen(3000, () => {
  console.log('listening on *:3000');
});


const fs = require('fs');

/*
function getFileName() {
	const today = new Date();
	const fileName = today.getDate() + "_" + (today.getMonth() + 1) + "_" +  today.getFullYear() + ".txt";
	return fileName;
}
*/
/*
function convertToCSV(arr) {
  const array = [Object.keys(arr[0])].concat(arr)

  return array.map(it => {
    return Object.values(it).toString()
  }).join('\n')
}
*/

const toTimestamp = (strDate) => {
  const dt = new Date(strDate).getTime();
  return dt;
}

const removeLines = (data, lines = []) => {
    return data
        .split('\n')
        .filter((val, idx) => lines.indexOf(idx) === -1)
        .join('\n');
}

var namespace = io.of('/labelNamespace');
namespace.on('connection', function(socket) {
	fs.readFile('flights.txt', 'utf8', function (err,filedata) {
			  if (err) {
				return console.log(err);
			  }
			  
			  namespace.emit('flights', filedata);
			});
	socket.on('newFlight', function(flights) {
		finalText = "\n"
		for (let i = 0; i < flights.length; i++) {
			finalText = finalText + flights[i].city_departure + "," + flights[i].airport_departure + "," + toTimestamp(flights[i].time_departure) + "," + flights[i].city_arrival + "," + flights[i].airport_arrival + "," + toTimestamp(flights[i].time_arrival) + ",AirFake"
			if(i < flights.length-1) finalText = finalText + ","
		}

		fs.appendFile('flights.txt', finalText, function (err) {
		  if (err) {
				return console.log(err);
			  }
		  console.log('Saved a new flight!');
		});
	});
	socket.on('deleteFlight', function(flightIndex) {
		fs.readFile('flights.txt', 'utf8', (err, data) => {
			if (err) throw err;

			// remove the first line and the 5th and 6th lines in the file
			fs.writeFile('flights.txt', removeLines(data, [flightIndex]), 'utf8', function(err) {
				if (err) throw err;
				console.log("the lines have been removed.");
			});
		})
	});
});



/*
namespace.on('connection', function(socket) {
	fs.writeFileSync(getFileName(), convertToCSV(finalResult));
	namespace.emit('urls', finalResult);
	
	socket.on('changedRow', function(data) {
	console.log('CHANGED ROW: '+ data.rowNumber +' ' + JSON.stringify(data.row));
	console.log('CHANGED ROW: '+ data.rowNumber +' ' + JSON.stringify(data.oldrow));
	
	
			fs.readFile(getFileName(), 'utf8', function (err,filedata) {
			  if (err) {
				return console.log(err);
			  }
			  
			  var re = new RegExp(Object.values(data.oldrow).toString(),"g");
			  console.log('Find: ' + Object.values(data.oldrow).toString());
			  console.log('Replace with: ' + Object.values(data.row).toString());
				//"mystring1".replace(re, "newstring");

			  var result = filedata.replace(re, Object.values(data.row).toString());
			  
			  console.log('RESULT: ' + result);

			  fs.writeFile(getFileName(), result, 'utf8', function (err) {
				 if (err) return console.log(err);
			  });
			});
	
	
	
		updateLabel(data.row).then(finalResult => {
		console.log('UPDATE done');
		})
	});
});




*/