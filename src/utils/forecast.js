const request = require('postman-request')
const forecast = (latitude, longitude, callback) => {
    const url = `https://api.weatherstack.com/current?access_key=c1f5c6c5acc9fb483942bff26b079260&query=${latitude},${longitude}#&units=m`

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Geocode service!', undefined)
        } else if (body.error === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            const weather_descriptions = body.current.weather_descriptions[0]
            const humidity = body.current.humidity

            callback(undefined,
                `${weather_descriptions}. It is currently ${temperature} degress out. It feels like ${feelslike} degrees out. The humidity is ${humidity}%.`
            )
        }
    })
}

module.exports = forecast