import express from 'express';

const PORT = 3000;
const app = express();
app.use(express.json());

const users = [
  { id: 1, name: 'khan', email: 'khan@gmail.com' },
  { id: 2, name: 'jan', email: 'jan@gmail.com' },
];

// GET USERS
app.get('/api/users', (req, res) => {
  res.status(200).json({ message: 'Get Request - get all users', users });
});

// CREATE USER
app.post('/api/users', (req, res) => {
  const userId = users.length + 1;
  const newUser = { id: userId, ...req.body }; // Fix: use 'id' instead of 'userId' in the object
  users.push(newUser);
  res.status(201).json({ message: 'Post Request - created a user', newUser });
});

// UPDATE USER
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  // Find the index of the user by ID
  const userIndex = users.findIndex((user) => user.id === userId);

  // Check if the user exists
  if (userIndex !== -1) {
    // Merge the existing user data with the updated data
    const updatedUser = { ...users[userIndex], ...req.body };
    
    // Update the user in the array
    users[userIndex] = updatedUser;

    res.status(200).json({
      message: `Update Request - The user with user id ${userId} is updated`,
      updatedUser,
    });
  } else {
    // If the user is not found, send a 404 error
    res.status(404).json({ message: `The user with user id ${userId} is not found` });
  }
});

// DELETE USER
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  // Find the index of the user by ID
  const userIndex = users.findIndex((user) => user.id === userId);

  // Check if the user exists
  if (userIndex !== -1) {
    // Remove the user from the array
    users.splice(userIndex, 1);

    res.status(200).json({
      message: `Delete Request - The user with user id ${userId} is deleted`,
    });
  } else {
    // If the user is not found, send a 404 error
    res.status(404).json({ message: `The user with user id ${userId} is not found` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
