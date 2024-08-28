const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {MongoClient} = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017/products');

async function connectDb() {
    await client.connect();
    console.log('Connected to the database-MongoDb');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

async function main() {
    await connectDb();
    const db = client.db('mydb');
    const products = db.collection('products');

    app.get('/products', async (req, res) => {
        let result = await products.find().toArray();      
        res.send(result);
        console.log(result);
    });

    app.post('/products', async (req, res) => {
        const data = req.body;
        await products.insertOne(data);
        res.send(data);
    });

    app.listen(7070, () => {
        console.log('Server is running on port 7070');
    });
}
    main();