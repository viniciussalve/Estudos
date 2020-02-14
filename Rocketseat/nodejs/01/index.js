const express = require('express');

const app = express();

app.use(express.json())

const users = ['Vinicius', 'daniel', 'arthur']

function checkIfUserExist(req, res, next) {
  if (!req.body.user) {
    return res.status(400).json({ error: "User name is required" })
  }

  return next()
}

function checkUserInArray(req, res, next) {
  const { id } = req.params;

  if (!users[id]) {
    return res.status(400).json({ error: "User dont exists in array" })
  }

  return next()
}

app.get('/users', (req, res) => {
  return res.json(users)
})

app.get('/users/:id', checkUserInArray, (req, res) => {
  const { id } = req.params;

  return res.json(users[id])
})

app.post('/users', checkIfUserExist, (req, res) => {
  const { user } = req.body;

  users.push(user)

  return res.json({ message: "ok" })
})

app.put('/users/:id', checkUserInArray, checkIfUserExist, (req, res) => {
  const { id } = req.params
  const { newValue } = req.body;

  users[id] = newValue;

  return res.json({ message: "ok" })
})

app.delete('/users/:id', checkUserInArray, (req, res) => {
  const { id } = req.params;

  users.splice(1, id)

  return res.json({ message: "ok" })
})

app.listen(3000)