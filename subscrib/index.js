import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import subsRoutes from './routes/subs.js'


const app = express();
const port = 3000;
// const url = "mongodb://localhost:27017/cv_raman";

app.use(bodyParser.json());

mongoose.connect(process.env.url,{useNewUrlParser:true},{ useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error',(error) => console.error(error));
db.once('open',() => console.log('Connected to DataBase'));

app.use('/api', subsRoutes);

app.get('/',(req,res) => {res.send('Welcome to Books API')});
app.all('*',(req,res) => {res.send('You have entered the wrong API')});

app.listen(port,() => {console.log(`http://localhost:${port}/api`)});