const express = require('express')
//const pug = require('pug')
const app = express()
const port = 3000
const path = require('path')
const router = express.Router()
const bodyParser= require('body-parser');
const mongoose = require('mongoose')
const Helicopter = require(__dirname + '/models/helicopters.js')

app.use(express.static(__dirname + '/public'))
app.set('views', __dirname + '/public/views')
app.use('/', router)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



const mongoDB = 'mongodb+srv://admin:admin@cluster0-blm4u.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html')
})


app.get('/api/list', function (req, res) {
  Helicopter.find(function (err, helicopters) {
    if (err) return console.error(err)
    res.send(helicopters)
  })
})

app.get('/api/reservations', function (req, res) {
  Helicopter.find({available: false}, function (err, helicopters) {
    if (err) return console.error(err)
    res.send(helicopters)
  })
})

app.get('/api/availableHelicopters', function (req, res) {
  Helicopter.find({available: true}, function (err, helicopters) {
    if (err) return console.error(err)
    res.send(helicopters)
  })
})

app.post('/list', function (req, res) {
  const data = req.body.data
  const helicopter = new Helicopter(data)

  helicopter.save(function (err) {
    if (err) {
      return handleError(err)
    }
    res.send()
  })
})

app.put('/list', function (req, res) {
  const data = req.body.data

  Helicopter.findOne({_id: data._id}, function (err, helicopter) {
    if (err) return console.error(err)

    helicopter.name = data.name
    helicopter.serial = data.serial

    helicopter.save(function (err) {
      if (err) {
        return handleError(err)
      }
      res.send()
    })
  }) 
})

app.delete('/list/:id', function (req, res) {
  const id = req.params.id
  Helicopter.deleteOne({_id: id}, function (err) {
    if (err) return console.error(err)
    res.send()
  })
})

app.put('/cancelReservation', function (req, res) {
  const data = req.body.data

  Helicopter.findOne({_id: data._id}, function (err, helicopter) {
    if (err) return console.error(err)
    helicopter.available = true

    helicopter.save(function (err) {
      if (err) {
        return handleError(err)
      }
      res.send()
    })
  })
})

app.put('/createReservation', function (req, res) {
  const data = req.body.data

  Helicopter.findOne({_id: data._id}, function (err, helicopter) {
    if (err) return console.error(err)
    helicopter.available = false

    helicopter.save(function (err) {
      if (err) {
        return handleError(err)
      }
      res.send()
    })
  })
})

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html')
})



//app.set('view engine', 'pug')
app.listen(port, () => console.log(`Example app listening on port ${port}!`))