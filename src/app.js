const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
   
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dave Berkenbile'
   })     
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dave Berkenbile'
   })     
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather',
        name: 'Dave Berkenbile',
        helpText: 'Give Me Help About Me'
   })     
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please Provide an Address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send(
                {
                    Location: location,
                    forecast: forecastData,
                    address: req.query.address
                })
        })
    }) 
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    } else {
        
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dave Berkenbile',
        errorMessage: 'Help Article Not Found'
   })   
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dave Berkenbile',
        errorMessage: 'Page Not Found'
   })   
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
