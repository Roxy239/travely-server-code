const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//MIDDLEWARE

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://travelyuser:4gJdUZYaQywvaz04@cluster0.mnttd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
// console.log(uri);


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//insert a document

async function run() {
    try {
        await client.connect();
        const database = client.db('tourism');
        const servicesCollection = database.collection('services');

        //GET PACKAGES API

        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })



        //POST API

        app.post('/services', async (req, res) => {
            const service = req.body;
            console.log('hit the post api', service)

            const result = await servicesCollection.insertOne(service);
            console.log(result);
            res.send(result);
        })
    }
    finally {

        //await client.close(); 
    }


}
run().catch(console.dir);






//

app.get('/', (req, res) => {
    res.send('Running Tourism Server');
});

app.listen(port, () => {
    console.log('Running Tourism Server on port', port);
})