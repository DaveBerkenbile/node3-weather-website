const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=7aeb585666ad3de3b497b1fd0f9463b7&query=" + longitude + "," + latitude + "&units=f"
    console.log(url)
    request({ url, json: true }, (error, { body } = {}) =>
    {    
        if (error) {
            callback("Unable to connect to weather service!",undefined)
        } else if(body.error){
            callback('Unable to find location',undefined)
        }
        else {
            var msg = body.current.weather_descriptions[0] + " It is currently "
            msg = msg + body.current.temperature
            msg = msg + " degrees out. It currently feels like "
            msg = msg + body.current.feelslike
            msg = msg + ". The Humidity Is "
            msg = msg + body.current.humidity + "."
            callback(undefined,msg)
        }
    })
}

module.exports = forecast