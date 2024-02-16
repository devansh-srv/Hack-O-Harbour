const express = require('express')
const app = express()
const port = 3000

const {MongoClient} = require('mongodb')
const uri = 'mongodb+srv://hackOharbour:D1kVfg4XSaaq3sUX@cluster0.g1ic6ja.mongodb.net/?retryWrites=true&w=majority';

const fs = require('fs');
const client = new MongoClient(uri);














app.use(express.json());

app.post('/', async (req, res) => {
  const resumedata = req.body;
  // code for checking resume score
})

app.post('/login', async (req, res) => {

  const userdata = req.body;
  const db = client.db('hackOharbour');
  const users = db.collection('users');
  const userarr = await users.find({}).toArray();

  const founduser = userarr.find(x => x.username === userdata.username);
  if(founduser){
    if(founduser.password === userdata.password){
      res.status(200).json({message: "login success"});
    }else{
      res.status(401).json({message: "Incorrect password"});
    }

  }else{
    res.status(401).json({message: "User not found"});
  }
})

app.post('/signup', async (req, res) => {
  const userdata = req.body;
  const db = client.db('hackOharbour');
  const users = db.collection('users');
  const userarr = await users.find({}).toArray();
  
  founduser = userarr.find(x => x.username === userdata.username);
  if(founduser){
    res.status(409).json({message: "User already exists"})
  }else{
    users.insertOne(userdata);
    res.status(200).json("signup successful");
  }
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
