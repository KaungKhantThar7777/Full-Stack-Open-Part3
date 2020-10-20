require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

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
  Person.find({}).then((people) => {
    res.json(people);
  });
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({ error: "name and number are required" });
  }

  const newPerson = new Person({
    name,
    number,
  });

  newPerson
    .save()
    .then((person) => res.json(person))
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = Number(req.params.id);
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const { name, number } = req.body;
  const updatePerson = {
    name,
    number,
  };
  Person.findByIdAndUpdate(req.params.id, updatePerson, { runValidators: true, new: true })
    .then((person) => res.json(person))
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = Number(req.params.id);
  Person.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((err) => next(err));
});

app.get("/info", async (req, res) => {
  const total = await Person.find({}).then((people) => people.length);
  res.send(`<p>Phonebook has info for ${total} people.</p> <p>${new Date()}</p>`);
});

app.use(express.static("build"));

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.code === 11000) {
    return response.status(400).send({ error: "duplicated key" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send(error);
  }

  next(error);
};

app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`App is listening on port ${port}`));
