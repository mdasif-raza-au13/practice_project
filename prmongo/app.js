import express from 'express';
import MongoClient from 'mongodb';

const app = express();
const port = 5020;
const url = "mongodb://localhost:27017";
const client = new MongoClient(url,{
    useUnifiedTopology: true
});

// to show data
app.get('/api/books', async (req,res)=>{
    await client.connect();
    const database = client.db('cv_raman');
    const collection = database.collection('books');
    const books = await collection.find({});
    const allValues = await books.toArray();
    await client.close();
    res.json({
        message: "Listing Books",
        data: allValues,
    })
});

// to update data
app.patch('/api/books/:isbn',async (req, resp)=> {
    await client.connect();
    const database = client.db('cv_raman');
    const collection = database.collection('books');
    collection.updateOne(
        {
            isbn:req.params.isbn
        },
        {
            $set:{
                status:true
            }
        }    
    ).then(() => {
        client.close();
    });
    resp.json({
        message: 'Updated successfully'
    });
});

app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`);
});