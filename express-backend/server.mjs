import express from 'express';

const PORT = 3000;
const app = express();
app.use(express.json());

const users = [
  { id: 1, name: 'khan', email: 'khan@gmail.com' },
  { id: 2, name: 'jan', email: 'jan@gmail.com' },
];

app.get('/api/users', (req, res) => {
  res.status(200).json({ message: 'Get Request - get all users', users });
});



app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
