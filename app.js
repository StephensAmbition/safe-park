mapboxgl.accessToken = 'pk.eyJ1IjoibWVkZm9yZGhpc3RvcmljYWwiLCJhIjoiY2o4ZXNiNHN2MTZycjMzb2ttcWp0dDJ1aiJ9.zt52s3jkwqtDc1I2Fv5cJg';
var data = [
    {
        "City": "Boston",
        "Meter_ID": "18770",
        "State": "MA",
        "Area": "N/A",
        "Time_Limits": "N/A",
        "Hours_of_Operation": "N/A",
        "Exceptions_Location": "N/A",
        "Peak_Time": "N/A",
        "Latitude": 42.34710878,
        "Longitude": -71.10298857,
        "Model": "N/A",
        "Smart_Meter": "N/A",
        "Cap_Color": "N/A",
        "Rate": "N/A"
    },
    {
        "City": "Boston",
        "Meter_ID": "18769",
        "State": "MA",
        "Area": "N/A",
        "Time_Limits": "N/A",
        "Hours_of_Operation": "N/A",
        "Exceptions_Location": "N/A",
        "Peak_Time": "N/A",
        "Latitude": 42.34706877,
        "Longitude": -71.10312888,
        "Model": "N/A",
        "Smart_Meter": "N/A",
        "Cap_Color": "N/A",
        "Rate": "N/A"
    },
    {
        "City": "Boston",
        "Meter_ID": "18771",
        "State": "MA",
        "Area": "N/A",
        "Time_Limits": "N/A",
        "Hours_of_Operation": "N/A",
        "Exceptions_Location": "N/A",
        "Peak_Time": "N/A",
        "Latitude": 42.34714821,
        "Longitude": -71.10284161,
        "Model": "N/A",
        "Smart_Meter": "N/A",
        "Cap_Color": "N/A",
        "Rate": "N/A"
    },
    {
        "City": "Boston",
        "Meter_ID": "20707",
        "State": "MA",
        "Area": "N/A",
        "Time_Limits": "N/A",
        "Hours_of_Operation": "N/A",
        "Exceptions_Location": "N/A",
        "Peak_Time": "N/A",
        "Latitude": 42.34718267,
        "Longitude": -71.10271546,
        "Model": "N/A",
        "Smart_Meter": "N/A",
        "Cap_Color": "N/A",
        "Rate": "N/A"
    },
    {
        "City": "Boston",
        "Meter_ID": "20826",
        "State": "MA",
        "Area": "N/A",
        "Time_Limits": "N/A",
        "Hours_of_Operation": "N/A",
        "Exceptions_Location": "N/A",
        "Peak_Time": "N/A",
        "Latitude": 42.34726977,
        "Longitude": -71.10235221,
        "Model": "N/A",
        "Smart_Meter": "N/A",
        "Cap_Color": "N/A",
        "Rate": "N/A"
    }
];

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-71.0589, 42.3601],
  zoom: 14
});

map.on('load', function(e) {

  // for(var i = 0; i < data.length; i++) {
  //   var el = document.createElement('div');
  //   el.className = 'marker';
  //   var marker = new mapboxgl.Marker(el, { offset: [0, -23]})
  //     .setLngLat([data[i].Longitude, data[i].Latitude])
  //     .addTo(map);
  //   }
  //   lat = 42.345974;
  //   long = -71.102475;
  //   distance = 1000;
  //   duration = 1;
    getMeters(lat, long, duration, distance);
  // buildMetersList();
});

function getMeters(lat, long, duration, distance) {
    axios.get('https://localhost:3000/parking', {
        params: {
          lat: lat,
          long: long,
          duration: duration,
          dist: distance
        }
    }).then(function(response) {
        buildUI(response);

    }).catch(function(error)) {
        console.log(error);
    }
}

function buildUI(meters) {
    for (i = 0; i < meters.length; i++) {
      var meter = meters[i];
      var el = document.createElement('div');
      el.className = 'marker';
      var marker = new mapboxgl.Marker(el, { offset: [0, -23]})
        .setLngLat([meter.long, meter.lat])
        .addTo(map);

      var meterList = document.getElementById('meterList');
      var listing = meterList.appendChild(document.createElement('div'));
      listing.className = 'item';
      listing.id = 'listing-' + i;

      var link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      link.dataPosition = i;
      link.innerHTML = "Parking Meter #" + (i + 1);


      var details = listing.appendChild(document.createElement('div'));
      details.innerHTML = meter.street + " Boston, MA";
    }
}
