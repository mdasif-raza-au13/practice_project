import { v4 as uuidv4 } from 'uuid';

let data = [];

export const getUsers = (req,res)=>{
    console.log(data);
    const message = "Showing details";
    res.json({
        data: data,
        message
    })
};

export const getUser = (req,res)=>{
    const message = "Showing details";
    let userfound = data.find(data => data.id == req.params.id);
    if(userfound){
        res.json({
            data: userfound,
            message
        })
    }else{
        res.json({
            message: `user with ${req.params.id} not found`
        })
    }
};

export const createUsers = (req,res)=>{
    const dt = req.body;
    data.push({...dt, id : uuidv4()});
    console.log(req.body);
    res.json({message:"enter the following id, body, iscompleted, createat"});
};

export const deleteUser = (req,res) =>{
    data = data.filter(data => data.id !== req.params.id);
    res.json({
        message: `user wit ${req.params.id} deleted`
    })
};

export const updateUser = (req,res)=>{
    const userChng = data.find(data => data.id == req.params.id);
    const { title, body } = req.body;
    if(userChng){
        if(title) userChng.title = title;
        if(body) userChng.body = body;
        res.send(`User with ${req.params.id} updated`)
    }else{
        res.status(404).json({
            message:`User with ${req.params.id} not found`
        })
    }
};