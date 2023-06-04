const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { error } = require('console')

// console.log(__dirname) // variable given by Node to point to path of directory current script is in.
// console.log(__filename) // variable given by Node to point to path current script is in.
// console.log(path.join(__dirname, '../public')) //we are joining two paths

const app = express() // App creation

const port = process.env.PORT || 3000

//Serving up a directory
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))


//customizing the views directory
const viewsPath = path.join(__dirname,'../templates/views')
app.set('views',viewsPath)

//Partials setup
const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)

// app.get('',(req,res)=>{ // Home page route
//     res.send('Hello Express!')
// })

// app.get('/help',(req,res)=>{ //Help route
//     res.send('Help page')
// })


// app.get('/about',(req,res)=>{ //About Route
//     res.send('<h1>About</h1 >')
// })

app.set('view engine','hbs')


app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        name:'Ashmit'
    })
})




//Setting up own API
app.get('/products',(req, res)=>{  //own api endpoints
    console.log(req.query)
    res.send({
        products: [ ]
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error){
            return res.send({error: error}) //return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast:forecastData,
                location,
                address : req.query.address
            })
        })
    })


    // res.send({
    //     forecast: 'It is',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })

})

//************ /

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Ashmit'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is the text',
        title : 'Help',
        name:'Ashmit'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title :'404',
        name:'Ashmit',
        msg:'Help article not found!'
    })
})

app.get('*',(req,res)=> {
    res.render('404',{
        title:'404',
        name:'Ashmit',
        msg : 'MY 404 PAGE'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port+'!')
})