const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/e20e39ad46798ffd39846d1179ba2c9f/'+lat+','+long+'/?units=auto'
    request({
        url,
        'json':true
     }, (error, {body})=>{
            if (error) {
                //low lavel error
                callback("Unable to connect to server", undefined)
            } else if(body.error) {
                callback("Unable to find any forecast", undefined)
            } else {
                const {temperature, precipProbability} = body.currently;
                const {summary = '', temperatureHigh = '', temperatureLow = '', windSpeed = ''} = body.daily.data[0];
                const returnForecast = {
                    summary,
                    temperatureHigh,
                    temperatureLow,
                    windSpeed,
                    temperature,
                    precipProbability
                }
                callback(undefined, returnForecast)
            }
     })
}

module.exports = forecast