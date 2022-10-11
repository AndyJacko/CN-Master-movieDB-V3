require("dotenv").config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

const connection = async () => {
  try {
    await client.connect();

    const db = client.db("movieDB");
    return db.collection("movie");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { client, connection };
