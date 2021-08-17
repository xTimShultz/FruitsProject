const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true, useUnifiedTopology: true});;

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Fruit name required"]
  },
  rating: {
    type: Number,
    min: 1,
    max:10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const pear = new Fruit ({
   name: "Pear",
   score: 3,
   review: "Too peary. Only good in pies."
});

pear.save();

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "John",
  age: 37,
  favoriteFruit: pear
});

person.save();

const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Insert some documents
    collection.insertMany([
        {name: "Apple1", score: 8, review: "great fruit"},
        {name: "Orange1", score: 6, review: "Kinda sour"},
        {name: "Banana1", score: 9, review: "Great stuff!"}
    ], function(err, result) {
       assert.equal(err, null);
       assert.equal(3, result.insertedCount);
       assert.equal(3, Object.keys(result.insertedIds).length);
       console.log("Inserted 3 documents into the collection");
       callback(result);
    });
  }

  const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Find some documents
    collection.find({}).toArray(function(err, fruits) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(fruits)
      callback(fruits);
    });
  }