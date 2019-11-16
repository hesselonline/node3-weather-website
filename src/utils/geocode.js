const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiaGVzc2Vsb25saW5lIiwiYSI6ImNrMXZ6bzE1cDAwd2szbXFwdnR6OGh5MDUifQ.VCCepaNoWU7di3BHe9t5bw&limit=1'
    
    request({url, json: true}, (error,{body}) =>{
        if (error) {
            callback('Unable to connect to the internet',undefined)
        } else if (body.features.length === 0){
            callback('Unable to find coordinates.',undefined)
        } else {
            const {center, place_name} = body.features[0]
            callback(undefined, {
             latitude: center[1],
             longtitude: center[0],
             location: place_name
        } )
        }
    
    
    })

}

module.exports = geocode