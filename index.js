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

		app.post("/post", async (req, res) => {
			const product = req.body;
			const result = await postCollection.insertOne(product);
			res.send(result);
		});
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
