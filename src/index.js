import express from 'express';
import bodyparser from 'body-parser';
const app = express();
const PORT = 5050;
const data = [];

app.use(bodyparser.json());

app.post('/app/v1/todo/create',(req,res)=>{
    data.push(req.body);
    console.log(req.body);
    res.json({message:"enter the following id, body, iscompleted, createat"});
});

app.get('/app/v1/todo/all',(req,res)=>{
    res.json(data);
    res.send('wait for the display');
});

app.listen(PORT,()=>{
    console.log(`listening on http://localhost:${PORT}/app/v1/todo/all`);
});