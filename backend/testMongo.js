const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

async function testConnection() {
    try {
        await client.connect();

        console.log("MongoDB driver connected successfully");

        await client.db().command({ ping: 1 });

        console.log("MongoDB ping successful");
    } catch (error) {
        console.error("MongoDB driver connection failed:");
        console.error(error.message);
    } finally {
        await client.close();
    }
}

testConnection();