const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
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
        const bookingCollection = database.collection('bookings');
        //GET PACKAGES API

        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })

        // GET Single Service
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            console.log('getting specific service', id);
            const query = { _id: ObjectId(id) };
            const service = await servicesCollection.findOne(query);
            res.json(service);
        })

        //POST API

        app.post('/services', async (req, res) => {
            const service = req.body;
            console.log('hit the post api', service)

            const result = await servicesCollection.insertOne(service);
            console.log(result);
            res.send(result);
        })
        // place order
        app.post('/booking', async (req, res) => {

            const order = { ...req.body, status: "pending" }
            const result = await bookingCollection.insertOne(order);

            res.send(order);



        })
        app.get('/my_booking', async (req, res) => {

            const { email } = req.query;
            const data = await bookingCollection.find({ email: email }).toArray();

            res.send(data)
        })
        app.get('/cancel_booking/:booking_id', async (req, res) => {
            const { booking_id } = req.params

            const updateResult = await bookingCollection.updateOne({ _id: ObjectId(booking_id) }, { $set: { status: "canceled" } });

            res.send(updateResult)


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