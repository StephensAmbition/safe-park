var express = require("express");
var axios = require('axios');
var app = express();
var bodyParser = require("body-parser");
var MapboxClient = require('mapbox');
var client = new MapboxClient('pk.eyJ1IjoibWVkZm9yZGhpc3RvcmljYWwiLCJhIjoiY2o4ZXNiNHN2MTZycjMzb2ttcWp0dDJ1aiJ9.zt52s3jkwqtDc1I2Fv5cJg');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 3000;

app.get('/', function(req, res) {
    res.send("hello");
});

app.get('/parking', function(req, res) {
    var info= req.query;
    var lat = info.lat;
    var long = info.long;
    var dist = info.dist;
    var street = info.street;
    console.log(lat);
    getParkingData(lat, long, dist, res);
    // axios.get('https://apis.solarialabs.com/shine/v1/parking-rules/meters',        { 
    //         params: {
    //             "lat": lat,
    //             "long": long,
    //             "max-distance": dist,
    //             "max-results": 5,
    //             "apikey": "xGKeKshQA8IBJsXiOgm0mdGjvWao2VjD"
    //         }
    //     })
    
    // .then(function(response) {
    //     //console.log(data);
    //     //console.log(response.data);
    //     res.json(response.data);
    //         //JSON.stringify(data));
        
    
//     })
// .catch (function(error){
//         console.log(error);
//         });

});

function getParkingData(lat, long, dist, res) {
   axios.get('https://apis.solarialabs.com/shine/v1/parking-rules/meters',        { 
            params: {
                "lat": lat,
                "long": long,
                "max-distance": dist,
                "max-results": 5,
                "apikey": "xGKeKshQA8IBJsXiOgm0mdGjvWao2VjD"
            }
        })
    
    .then(function(response) {
        //console.log(data);
        //console.log(response.data);
        res.json(response.data);
            //JSON.stringify(data));
        
    
    })
.catch (function(error){
        });
}

function cmpRankCrime() {
    
}    

app.listen(3000);

