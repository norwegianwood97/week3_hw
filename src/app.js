// src/app.js

import express from 'express';
import CategoriesRouter from './routes/categories.router.js';
import MenusRouter from './routes/menus.router.js';

const app = express();
const PORT = 3018;

app.use(express.json());
app.use('/api', [CategoriesRouter, MenusRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});