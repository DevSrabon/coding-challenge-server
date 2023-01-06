const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sajc8ea.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

async function run() {
	try {
        const postCollection = client.db("CodingChallenge").collection("posts");
        const testCollection = client.db("CodingChallenge").collection("test")

        app.get("/post", async (req, res) => {
            const query = {};
            const result = await postCollection.find(query).toArray();
            res.send(result);
        })

		app.post("/post", async (req, res) => {
			const product = req.body;
			const result = await postCollection.insertOne(product);
			res.send(result);
        });
        app.put('/post/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const query = req.body.name
									const options = { upsert: true };
									const updateDoc = {
										$set: {
											name: query,
										},
									};
									const result = await postCollection.updateOne(
										filter,
										updateDoc,
										options
									);
            res.send(result);
            console.log(id)
        })
        app.get('/test', async (req, res) => {
            const query = {};
            const result = await testCollection.find(query).toArray();
            res.send(result)
        })
	} finally {
	}
}
run().catch(console.log);

app.get("/", async (req, res) => {
	res.send("coding Challenge server is running");
});

app.listen(port, () =>
	console.log(`coding Challenge server running on ${port}`)
);
