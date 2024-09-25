import express from 'express';
import cors from 'cors';

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

let users = [
  { id: 1, name: 'khan', email: 'khan@gmail.com' },
  { id: 2, name: 'jan', email: 'jan@gmail.com' },
];

// GET USERS
app.get('/api/users', (req, res) => {
  res.status(200).json({ message: 'Get Request - get all users', users });
});

// CREATE USER
app.post('/api/users', (req, res) => {
  const maxId = users.length > 0 ? Math.max(...users.map(user => user.id)) : 0; // Find max ID
  const newUser = { id: maxId + 1, ...req.body };  // Assign unique id
  users.push(newUser);
  res.status(201).json({ message: 'Post Request - created a user', newUser });
});

// UPDATE USER
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;
    res.status(200).json({
      message: `Update Request - The user with user id ${userId} is updated`,
      updatedUser,
    });
  } else {
    res.status(404).json({ message: `The user with user id ${userId} is not found` });
  }
});

// DELETE USER
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(200).json({
      message: `Delete Request - The user with user id ${userId} is deleted`,
    });
  } else {
    res.status(404).json({ message: `The user with user id ${userId} is not found` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
