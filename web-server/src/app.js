const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


//app.com
app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'Jack Wright'
    })
})


//app.com/about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jack Wright'
    })
    })


    //app.com/help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Screen',
        link: 'http://localhost:3000/helpMessage',
        name: 'Jack Wright'
    })
    })

      //app.com/weather
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

 
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


//app.com/helpMessage
app.get('/helpMessage', (req, res) => {
    res.render('helpMessage', {
        msg: 'Everything is okay!'
    })
})


app.get('/help/*', (req, res) => {
    res.render('errorMessage', {
        title: '404',
        msg: 'Page not found',
        name: 'Jack Wright'
    })
    })

app.get('*', (req, res) => {
    res.render('errorMessage', {
        title: '404',
        msg: 'Help article not found',
        name: 'Jack Wright'
    })
    })

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})