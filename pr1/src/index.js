import express from 'express';
import bodyparser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
const app = express();
const PORT = 5050;
const data = [];

app.use(bodyparser.json());

app.post('/app/v1/todo/create',(req,res)=>{
    const dt = req.body;
    data.push({...dt, id : uuidv4()});
    console.log(req.body);
    res.json({message:"enter the following id, body, iscompleted, createat"});
});

app.get('/app/v1/todo/all',(req,res)=>{
    console.log(data);
    const message = "Showing details";
    res.json({
        data: data,
        message
    })
});

app.put('app/v1/todo/:id',(req,res)=>{
    let userId = data.filter(user => user.id == req.params.id);
    const message = "User updated";
    if(userId.length){
        data = data.map(user =>{
            if(user.id == req.params.id){
                userId = User({
                    id : user.id,
                    ...req.body
                })
                return userId
            }
            return user
        });
    }else{
        userId = User({id: uuidv4(), ...req.body});
        users.push(userId);
        message = 'New user created.';
    }
    res.status(201).json({
        data: userId,
        message
    })
});

app.listen(PORT,()=>{
    console.log(`listening on http://localhost:${PORT}/app/v1/todo/all`);
});