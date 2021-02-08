import {data} from './books.js';
import pkg from 'mongodb';
import fs from 'fs';
const { MongoClient } = pkg;

const uri ="mongodb://localhost:27017"
const client = new MongoClient(uri,{ useUnifiedTopology: true });


async function run() {
  try {
    await client.connect();
    const database = client.db('cv_raman');
    const collection = database.collection('collection');
    const query = { "name":"Asif" };
    const result = await collection.findOne(query);
    console.log(result);
  } finally {
 
    await client.close();
  }
}
run().catch(console.dir);

async function bookd() {
  try {
    await client.connect();
    const database = client.db('cv_raman');
    const collection = database.collection('books');
    const result = await collection.insertMany(data);
    console.log(result);
  } finally {
    await client.close();
  }
}
bookd().catch(console.dir);
