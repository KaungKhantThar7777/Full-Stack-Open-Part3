const express = require("express");
const app = express();

const persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "kkt",
    number: "222",
    id: 3,
  },
  {
    name: "test",
    number: "33",
    id: 4,
  },
  {
    name: "test2",
    number: "3",
    id: 5,
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people.</p><br /> ${new Date()}`);
});
const port = 5000;
app.listen(port, () => console.log(`App is listening on port ${port}`));
