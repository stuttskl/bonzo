require("dotenv").config({ path: "/Users/katie/code/bonzo/.env" });

const { MongoClient } = require("mongodb");

const dbUser = process.env.DB_USERNAME;
const dbPw = process.env.DB_PW;
const uri = `mongodb+srv://${dbUser}:${dbPw}@bonzo-cluster.xojqpzy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

client
    .connect(uri)
    .then(() => {
        console.log("Database connection established");
    })
    .catch((error) => {
        console.log("Error connecting to database.");
    });
