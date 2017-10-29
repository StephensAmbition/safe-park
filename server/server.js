var express = require("express");
var axios = require('axios');
var app = express();
var bodyParser = require("body-parser");
var MapboxClient = require('mapbox');
var client = new MapboxClient('pk.eyJ1IjoibWVkZm9yZGhpc3RvcmljYWwiLCJhIjoiY2o4ZXNiNHN2MTZycjMzb2ttcWp0dDJ1aiJ9.zt52s3jkwqtDc1I2Fv5cJg');
var crimeData = require('./crimedata.json');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 3000;

var fakeMeters = [
	{
		lat: 42.34835708,
		long: -71.13645291,
		street: "COMMONWEALTH AVE"
	},
	{
		lat: 42.34810188,
		long: -71.08814056,
		street: "MASSACHUSETTS AVE"
	},
	{
		lat: 42.31485546,
		long: -71.0992241,
		street: "WASHINGTON ST"
	},
	{
		lat: 42.34009994,
		long: -71.06818369,
		street: "7th Avenue"
	},
	{
		lat: 42.34009994,
		long: -71.06818369,
		street: "MONSIGNOR REYNOLDS WAY"
	}
];

app.get('/', function(req, res) {
    res.send("hello");
});

app.get('/parking', function(req, res) {
    var info= req.query;
    var lat = info.lat;
    var long = info.long;
    var dist = info.dist;
    var street = info.street;
    getParkingData(lat, long, dist, res);

});

function getParkingData(lat, long, dist, res) {
   axios.get('https://apis.solarialabs.com/shine/v1/parking-rules/meters', { 
            params: {
                "lat": lat,
                "long": long,
                "max-distance": dist,
                "max-results": 5,
                "apikey": "xGKeKshQA8IBJsXiOgm0mdGjvWao2VjD"
            }
        })
    	.then(function(response) {
	    	var parkingData = response.data;
	    	// var meters = [];
	    	// for(var i = 0; i < parkingData.length; i++) {
	    	// 	getGeoNames(parkingData[i], res, meters);
	    	// 	console.log(meters);
	    	// }
	    	rankMeters(fakeMeters, res);
        	//res.json(response.data);
    	})
		.catch (function(error) {
			console.log(error);
        });
}

function getGeoNames(parkingData, res, meters) {
	
	
		var obj = {};
		var lat = parkingData.Latitude;
		var long = parkingData.Longitude;
		Object.assign(obj, {
			latitude: lat,
			longitude: long,
			options: {types: 'address', limit: 1}
		});
		client.geocodeReverse(obj,

			function(err, response){
				var street = response.features[0].properties.address;
				var meter = {
					lat: lat,
					long: long,
					street: street
				};
				meters.push(meter);
				
				// if(i == parkingData.length - 1){
				// 	rankCrimes(meters);
				// }
				

			}
		)
	
}


function rankMeters(meters, res) {
	for (var i = 0; i < meters.length; ++i){
		meters[i].crimeCount = 0;
		for (var j = 0; j < crimeData.length; ++j){
			if (meters[i].street == crimeData[j].Street){
				meters[i].crimeCount++;
			}
		}
	}
	meters.sort(function(a, b) {
		return a.crimeCount - b.crimeCount;
	});
	res.json(meters);

}   

app.listen(3000);

