const express = require('express');
const cors = require('cors');
const multer = require('multer')
const app = express()
const port = 3000
const { spawn } = require('child_process');
const fs = require('fs');

const {MongoClient, GridFSStream} = require('mongodb')
const uri = 'mongodb+srv://hackOharbour:D1kVfg4XSaaq3sUX@cluster0.g1ic6ja.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);
const db = client.db('hackOharbour');

app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  // code for checking resume score
})

app.post('/login', async (req, res) => {

  const userdata = req.body;
  const users = db.collection('users');
  const userarr = await users.find({}).toArray();

  const foundUser = userarr.find(x => x.email === userdata.email);
  if(foundUser){
    if(foundUser.password === userdata.password){
      res.status(200).json(foundUser);
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
  console.log(companyName);
  const jobs = db.collection('jobs');
  const jobsarr = await jobs.find({Company: companyName}).toArray();

    res.status(200).json(jobsarr);
})

app.post('/createjob', (req, res) => {
  
  const createjob = req.body;
  const jobs = db.collection('jobs');
  
  createjob['participants'] = [null];

  jobs.insertOne(createjob);
  res.status(200).send("done");
})

app.post('/applyjob', async (req, res) => {

  const jobs = db.collection('jobs');
  const resume = await db.collection('resume').findOne({email: req.body.email});
  const user = await db.collection('users').findOne({email: req.body.email});
  if(!resume){
    return res.status(404).send("resume not found");
  }

  const score = await executePython('filter.py', 'resume.pdf', 'jobdesc.pdf');
  console.log(score);

  const pushData = {
    email: user.email,
    name: user.username,
    score: score,
    link: "link"
  }

  jobs.updateOne(
    {ID: req.body.job.id},
    {$push: {participants: pushData}}
  );
  res.status(200).send("done");
})

function retrievePDF(collectionName, email) {
  const gfs = new GridFSStream(db, { collection: collectionName });

  gfs.files.findOne({ email: email }, (err, file) => {
    if (err) {
      console.error('Error finding PDF:', err);
      return;
    }

    if (!file) {
      console.error('PDF not found with ID:', pdfId);
      return;
    }

    const readStream = gfs.createReadStream({
      _id: file._id,
      filename: file.filename
    });

    let pdfData = '';
    readStream.on('data', (chunk) => {
      pdfData += chunk.toString('binary'); // Ensure 'binary' encoding
    });
    readStream.on('error', (err) => {
      console.error('Error reading PDF:', err);
    });
    readStream.on('end', () => {
      const pdfString = Buffer.from(pdfData, 'binary').toString('base64'); // Convert to base64 string
      console.log('PDF retrieved and converted to string:', pdfString);

      // Now you can use the `pdfString` variable for further processing
      // Close the connection after using the string
      return pdfString;
    });
  });
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage: storage });

app.post('/uploadresume', upload.single('resume'), async (req, res) => {

  const fs = require('fs');
  const resume = db.collection('resume');
  const data = fs.readFileSync(req.file.path);

  resume.insertOne({
    email: req.headers.email,
    filename: req.file.originalname,
    contentType: req.file.mimetype,
    size: req.file.size,
    pdf: {
      data: data,
      contentType: req.file.mimetype
    }
  });

  fs.unlinkSync(req.file.path);

  res.status(200).send("done");
})

app.get('/jobs', async (req, res) => {
    
  const jobsarr = await db.collection('jobs').find({}).toArray();

  let resarr = [];

  for (let i=0; i<jobsarr.length; i++){
    resarr.push({id: jobsarr[i].ID, title: jobsarr[i].title, company: jobsarr[i].company, desc: jobsarr[i].description});
  }
  res.status(200).json(resarr);
})

app.get('/jobstatus:id', async (req, res) => {
    
  const jobID = req.params.id;
  const jobsarr = await db.collection('jobs').find({}).toArray();

  foundjob = jobsarr.find(x => x.ID === jobID);
  if(foundjob){
    const dataToSend = (foundjob.participants).sort((a,b) => b.score - a.score)
    res.status(200).json(dataToSend);
  }else{
    res.status(404).send("job not found");
  }
})

app.get('/gettest:id', async (req, res) => {
  const id = req.params.id.slice(1);
  const questarr = await db.collection('jobs').findOne({ID: id});
  res.status(200).json(questarr.test);
})

const executePython = async (script, arg) => {
  const arguments = arg.toString();

  const py = spawn("python", [script, arguments]);

  const result = await new Promise((resolve, reject) => {
    let output;

      py.stdout.on('data', (data) => {
        output = data.toString();
      });

      py.stderr.on("data", (data) => {
        console.error(`[python] Error occured: ${data}`);
        reject(`Error occured in ${script}`);
      });

      py.on("exit", (code) => {
        console.log(`Child process exited with code ${code}`);
        resolve(output);
      });
  });

  return result;
}



app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
