const express = require("express");
const app = express();

let persons = [
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

app.use(express.json());

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const id = Math.floor(Math.random() * 99999);
  const person = { id, ...req.body };
  persons = persons.concat(person);
  res.status(201).send(person);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people.</p><br /> ${new Date()}`);
});
const port = 5000;
app.listen(port, () => console.log(`App is listening on port ${port}`));
