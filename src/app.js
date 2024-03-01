// src/app.js
import dotenv from 'dotenv';
import express from 'express';
import CategoriesRouter from './routes/categories.router.js';
import MenusRouter from './routes/menus.router.js';

dotenv.config();

const app = express();
const PORT = 3018;

app.use(express.json());
app.use('/api/categories', CategoriesRouter);
app.use('/api/categories/:categoryId/menus', MenusRouter);
app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});