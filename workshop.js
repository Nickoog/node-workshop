var request = require('request-promise');

// Euclidian distance between two points
function getDistance(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2));
}

function getIssPosition() {
    return request('http://api.open-notify.org/iss-now.json')
        .then(function(response) {
            var data = JSON.parse(response); // Parse as JSON
            var postion = {
                lng : data.iss_position.longitude,
                lat : data.iss_position.latitude
            }
            return postion;
            
            // return data.iss_position;// Return object with lat and lng
        })
}

function getAddressPosition(address) {
    return request('https://maps.googleapis.com/maps/api/geocode/json?address=' + address)
        .then(function(response) {
            var data = JSON.parse(response);
            
            return data.results[0].geometry.location;
        })

}

function getCurrentTemperatureAtPosition(position) {
    return request('https://api.darksky.net/forecast/909a03baced3035eb51d7c806f00ba53/' + position.lat + ',' + position.lng)
        .then(function(response) {
            var data = JSON.parse(response);
        
            return data.currently.temperature;
        })

}

function getCurrentTemperature(address) {
    return getAddressPosition(address)
        .then(getCurrentTemperatureAtPosition);

}

function getDistanceFromIss(address) {
**********************************************************
var addressPositionPromise = getAddressPosition(address);
var issPositionPromise = getIssPosition();
    return Promise.all([addressPositionPromise, issPositionPromise])

    return Promise.all([getAddressPosition(address), getIssPosition()])
        .then(function(position) {
            return getDistance(position[0], position[1]);
        });
}
 *********************************************************
   var addressPosition;
   
   return getAddressPosition(address)
        .then(function(addPos){
            addressPosition = addPos;
            return getIssPosition();
        })
        .then(function(issPos){
            return getDistance(issPos, addressPosition);
        })
    }
exports.getIssPosition = getIssPosition;
exports.getAddressPosition = getAddressPosition;
exports.getCurrentTemperatureAtPosition = getCurrentTemperatureAtPosition;
exports.getCurrentTemperature = getCurrentTemperature;
exports.getDistanceFromIss = getDistanceFromIss;