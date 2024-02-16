const express = require('express')
const MongoClient = require('mongodb')
const Multer = require('multer')
const url = '';
const dbName = '';
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login', (req, res) => {
    res.send("login info")
})

app.get('/signup', (req, res) => {
    res.send("login info")
})

app.get('/company', (req, res) => {
    res.send("login info")
})

app.get('/createjob', (req, res) => {
    res.send("login info")
})

app.get('/jobs', (req, res) => {
    res.send("login info")
})

app.get('/jobstatus:id', (req, res) => {
    res.send("login info")
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
