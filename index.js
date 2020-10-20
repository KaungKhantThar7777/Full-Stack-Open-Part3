const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

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
app.use(cors());
// app.use(morgan("tiny"));
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :response-time ms - :body"));

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const id = Math.floor(Math.random() * 99999);
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({ error: "name and number are required" });
  }
  const isUserExist = persons.find((p) => p.name === name);
  if (isUserExist) {
    return res.status(400).json({ error: "name must be unique" });
  }
  const person = { id, name, number };
  persons = persons.concat(person);
  res.status(201).json(person);
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
const port = 3001;
app.listen(port, () => console.log(`App is listening on port ${port}`));
