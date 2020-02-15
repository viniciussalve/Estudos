const express = require('express')

const app = express();

app.use(express.json())

const projects = [];

function checkIfIdExists(req, res, next) {
  const { id } = req.params;

  const user = projects[id];

  if (!user) {
    return res.status(400).json({ message: "id dosent exists" });
  }

  return next();
}

function returnRequisitionsCounter(req, res, next) {
  console.count("Requisições");
  return next();
}

app.post('/projects', returnRequisitionsCounter, (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project)

  return res.json({ message: "ok" });

})

app.get('/projects', returnRequisitionsCounter, (req, res) => res.json(projects))

app.put('/projects/:id', checkIfIdExists, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const project = projects.find(project => project.id === id);

  project.title = title;

  return res.json({ message: "ok" });
})

app.delete('/projects/:id', returnRequisitionsCounter, checkIfIdExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  projects.splice(projectIndex, 1);

  return res.json({ message: "ok" });
})

app.post('/projects/:id/tasks', returnRequisitionsCounter, checkIfIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id === id);

  project.tasks.push(title);

  return res.json({ message: "ok" });
})

app.listen(3333)