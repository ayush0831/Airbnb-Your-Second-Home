const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");

const Mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
async function main(){
    await mongoose.connect(Mongo_url);
};

const initDB = async() => {
    await listing.deleteMany();
    initData.data = initData.data.map((obj) => ({...obj,owner:"68867067e3806fb3215d7a50"}));
    await listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();