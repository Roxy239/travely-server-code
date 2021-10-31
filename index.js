const express = require('express');
const { MongoClient } = require('mongodb');

// const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;




const uri = `mongodb+srv://travelyuser:4gJdUZYaQywvaz04@cluster0.mnttd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
// console.log(uri);


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//insert a document

async function run() {
    try {
        await client.connect();
        const database = client.db('tourism');
        const servicesCollection = database.collection('packages');

        //POST API

        app.post('/services', async (req, res) => {
            const services = {
                "name": "Taos Mountains 3 Days Tour",
                "fee": 5000,
                "description": "If you are interested in climbing to the top, there are various routes that you can choose from and each takes roughly  hiking to get to the top. in New MEXICO. Go ahead and fall in love!",
                "img": "https://i.ibb.co/3S04JLJ/drif-riadh-Ypku-Rn54y4w-unsplash.jpg"
            }

            const result = await servicesCollection.insertOne(services);
            console.log(result);
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