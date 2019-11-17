const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZGViYXNpczk5IiwiYSI6ImNrMzE5NmNwcDA2cmYzbHM1azhrd3VsN2YifQ.StgK5etw3QT-DpARwl4ONw&limit=1'

    request({
        url,
        'json':true
     }, (error, {body})=>{
         if (error) {
             //low lavel error
             callback("Unable to connect to server", undefined)
         } else if(body.features.length === 0) {
             callback("Unable to find any location", undefined)
         } else {
             const {place_name, center:latLong} = body.features[0];
             const returnLocation = {
                place_name,
                'lat' : latLong[1],
                'long' : latLong[0],
             }
             callback(undefined, returnLocation)
         }
     })
}

module.exports = geocode