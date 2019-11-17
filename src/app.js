const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Swtup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Hessel van Es'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Let me help you...',
        name: 'Hessel van Es'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather',
        name: 'Hessel van Es'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address)
    {
        return res.send ({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send ({error})
        }
        else {
            
            forecast(latitude, longtitude, (error, forecastData) => {
                if (error){
                    return res.send ({error})
                } else {
                    res.send( {
                        forecast: forecastData,
                        location: location
                
                    })
                
            }})
        }
    
    })
    

})

app.get('/products', (req,res) => {
    f (!req.query.search)
    {
        return res.send ({
            error: 'You must provide a search term'
        })
    }
    res.send( {
        products:[]

    })

})

app.get('/help/*',(req,res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Hessel van Es',
        message: 'Help article not found'
    })

})

app.get('*',(req,res)=>{
    res.render('404', {
        title: '404 Error',
        name: 'Hessel van Es',
        message: 'Page not found'
    })

})

app.listen(port, () => {
    console.log('Server is up on port',port)
})