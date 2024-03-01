import express from 'express';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();

// 카테고리 등록 API
router.post('/categories', async (req, res) => {
  
  const {name} = req.body


  if (!name) {
    return res.status(200).json({errerMessage: "데이터 형식이 올바르지 않습니다." })
  }

  const newCategory = await prisma.categories.create({ // 새 카테고리 생성
    data: {
        id: id,
        name: name,
        order: order,
    },
});
return res.status(200).json({ message: "카테고리를 등록하였습니다." });
});



export default router;

