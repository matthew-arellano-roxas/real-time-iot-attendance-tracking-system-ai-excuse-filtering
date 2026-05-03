import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  console.log('Class route');
  res.json({ message: 'Class route' });
});
