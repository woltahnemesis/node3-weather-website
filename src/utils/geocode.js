const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.positionstack.com/v1/forward?access_key=cea5d72ff191d3e0cd363903847ea1cb&query=' + encodeURIComponent(address) + '&country_module=1#'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Geocode service!', undefined)
        } else if (body.error === 0 || body.data === undefined || body.data[0] === undefined) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })
}

module.exports = geocode