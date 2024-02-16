const express = require('express');
const cors = require('cors');
const app = express()
const port = 3000

const {MongoClient} = require('mongodb')
const uri = 'mongodb+srv://hackOharbour:D1kVfg4XSaaq3sUX@cluster0.g1ic6ja.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);
const db = client.db('hackOharbour');

app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  const resumedata = req.body;
  // code for checking resume score
})

app.post('/login', async (req, res) => {

  const userdata = req.body;
  const users = db.collection('users');
  const userarr = await users.find({}).toArray();

  console.log(userdata);

  const foundUser = userarr.find(x => x.email === userdata.email);
  if(foundUser){
    if(foundUser.password === userdata.password){
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
  
  console.log(userdata);
  
  const foundUser = userarr.find(x => x.email === userdata.email);
  if(foundUser){
    res.status(409).json({message: "Email already exists"})
  }else{
    users.insertOne(userdata);
    res.status(200).json("signup successful");
  }
})

app.get('/company:cname', async (req, res) => {

  let companyName = req.params.cname.slice(1);
  const jobs = db.collection('jobs');
  const jobsarr = await jobs.find({company: companyName}).toArray();

  if(jobsarr.length != 0){
    res.status(200).json(jobsarr);
  }else{
    res.status(404).json("companynotfound");
  }

})

app.post('/createjob', (req, res) => {
  
  const createjob = req.body;
  const jobs = db.collection('jobs');
  
  createjob['participants'] = [null];

  jobs.insertOne(createjob);
  res.status(200).send("done");
})

app.post('/applyjob', async (req, res) => {

  console.log(req.body);
  const jobs = db.collection('jobs');
  const user = await db.collection('users').findOne({email: req.body.email});
  const pushData = {
    email: user.email,
    name: user.username,
    score: '0',
    link: "link"
  }
  jobs.updateOne(
    {ID: req.body.jobid},
    {$push: {participants: pushData}}
  );
  res.status(200).send("done");
})

app.post('/uploadresume', async (req, res) => {

  console.log(req.body);
  const jobs = db.collection('jobs');
  const user = await db.collection('users').findOne({email: req.body.email});

  res.status(200).send("done");
})

app.get('/jobs', async (req, res) => {
    
  const jobsarr = await db.collection('jobs').find({}).toArray();

  let resarr = [];

  for (let i=0; i<jobsarr.length; i++){
    resarr.push({title: jobsarr[i].title, company: jobsarr[i].company, desc: jobsarr[i].description});
  }

  res.status(200).json(resarr);
})

app.get('/jobstatus:id', async (req, res) => {
    
  const jobID = req.params.id;
  const jobsarr = await db.collection('jobs').find({}).toArray();

  foundjob = jobsarr.find(x => x.ID = jobID);
  if(foundjob){
    res.status(200).json(foundjob.participants);
  }else{
    res.status(404).send("job not found");
  }
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
