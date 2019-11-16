const request = require('request')

const forecast = (latitude,longtitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8d1ea04c193efda4b8bbb49b1131a8fd/'+latitude+','+longtitude
    
    request({url, json: true}, (error,{body}) =>{
        if (error) {
            callback('Unable to connect to the internet',undefined)
        } else if ( body.error){
            callback('Unable to find location.',undefined)
        } else {
            const {temperature, precipProbability } = body.currently
            const forecast = body.daily.data[0].summary + " It is currently " + temperature + " degrees out. There is a " + precipProbability + "% chance of rain."
            callback(undefined, forecast)
        }
    
    
    })

}
module.exports = forecast