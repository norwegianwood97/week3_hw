// src/routes/categories.router.js

import express from 'express';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();

// 카테고리 등록 API
router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
  }

  try {
    const lastCategory = await prisma.categories.findFirst({
      orderBy: {
        order: 'desc',
      },
    });
    const newOrder = lastCategory ? lastCategory.order + 1 : 1;

    const newCategory = await prisma.categories.create({
      data: {
        name : name,
        order : newOrder
      },
    });
    return res.status(201).json({ message: "카테고리를 등록하였습니다.", category: newCategory });
  } catch (error) {
    return res.status(500).json({ errorMessage: "카테고리 등록 중 오류가 발생했습니다.", error: error.message });
  }
});


export default router;

