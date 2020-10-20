const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please provide the password as an argument: node mongo.js <password>");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://kaung:${password}@cluster0.aogxo.mongodb.net/phone-book?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) =>
  console.log("connected successfully", err)
);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Phonebook", personSchema);

if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const newPerson = new Person({
    name,
    number,
  });

  newPerson.save().then((res) => {
    console.log(`Added ${res.name} number ${res.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((person) => {
    console.log("phonebook:");
    person.forEach((person) => console.log(`${person.name} ${person.number}`));
    mongoose.connection.close();
  });
}
