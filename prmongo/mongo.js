import bookData from './books.json';
const { MongoClient } = require("mongodb");

const uri ="mongodb://localhost:27017"
const client = new MongoClient(uri,{ useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    // const database = client.db('cv_raman');
    // const collection = database.collection('collection');

    const database = client.db('cv_raman');
    const collection = database.collection('books');
  
    // const query = { "name":"baby" };
    // const result = await collection.findOne(query);

    const result = await collection.insertMany(bookData);

    console.log(result);
  } finally {
 
    await client.close();
  }
}
run().catch(console.dir);