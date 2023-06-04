const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=e67594a278f28c82235efd4f1f2d7400&query='+latitude+','+longitude+'&units=m'

    request({url:url, json:true},(error,response)=>{  //request({url, json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }
        else if(response.body.error){  //else if(body.error){
            callback('Unable to find location!',undefined)
        }
        else{
            callback(undefined,response.body.current.weather_descriptions[0]+'. It is currently '+response.body.current.temperature+' degress out. It feels like '+response.body.current.feelslike+' degrees!')
        }                      //body.current.weather_descriptions[0]                                 //body.current.temperature                                        //body.current.feelslike                          
    })
}

module.exports = forecast