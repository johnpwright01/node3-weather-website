const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2db68ab9df2c726ed341c3f60872304e&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json:true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to the weather service!', undefined)
        } else if (body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}


module.exports = forecast