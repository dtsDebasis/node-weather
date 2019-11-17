const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDir = path.join(__dirname, '../public')
const viewDir = path.join(__dirname, '../template/views')
const partialsDir = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views', viewDir)
hbs.registerPartials(partialsDir)

app.use(express.static(publicDir))

app.get('', (req, res)=>{
    res.render('index', {
        'name' : 'Debasis Chakraborty',
        'page_title' : 'Home Page'
    })
})
app.get('/about', (req, res)=>{
    res.render('about', {
        'page_title' : 'About Page',
        'name' : 'Debasis Chakraborty',
    })
})
app.get('/help', (req, res)=>{
    res.render('help', {
        'page_title' : 'Help Page',
        'name' : 'Debasis Chakraborty',
        'email' : 'chakraborty.debasis99@gmail.com',
    })
})

app.get('/weather', (req, res)=>{
  const {address} = req.query;
  if (!address) {
    return   res.send({
        "error" : "Please provide an address!"
    })
  }
    geocode(address, (error, {lat, long, place_name} = {})=>{
        if (error) {
                return res.send({
                    error
                })
        } else {
            forecast(lat, long, (error, {temperature, precipProbability} = {})=>{
                if (error) {
                    return res.send({
                      error
                    })
                } else {
                    res.send({
                        address,
                        place_name,
                        "forecast" : "It is currently "+temperature+" degrees out there, and "+ precipProbability+"% chance of rain"
                    })
                }
            })
        }
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        'page_title' : '404 Page',
        'name' : 'Debasis Chakraborty',
        'email' : 'chakraborty.debasis99@gmail.com',
        'error' : 'Help article not found',
    })
})
app.get('*', (req, res)=>{
    res.render('404', {
        'page_title' : '404 Page',
        'name' : 'Debasis Chakraborty',
        'email' : 'chakraborty.debasis99@gmail.com',
        'error' : 'Page not found',
    })
})

app.listen(3000, ()=>{
    console.log("App is runing on 3000 port. Visit http://localhost:3000/")
})