import express from 'express';

const PORT = 3000;
const app = express();
app.use(express.json());

const users = [
  { id: 1, name: 'khan', email: 'khan@gmail.com' },
  { id: 2, name: 'jan', email: 'jan@gmail.com' },
];



app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
