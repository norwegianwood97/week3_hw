import express from 'express';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();

// 카테고리 등록 API
router.post('/categories', async (req, res) => {
  try {
    const { name } = req.body; // req.body에서 name만 추출

    if (!name) {// 데이터 형식이 올바르지 않은 경우 클라이언트에게 에러 메시지 반환
      return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    }

    await prisma.categories.create({
      data: {
        name: name,
      },
    });

    // 카테고리 생성 성공 응답
    return res.status(201).json({ message: "카테고리를 등록하였습니다." });
  } catch (error) {
    // 서버 내부 오류 처리
    return res.status(500).json({ errorMessage: "서버 에러가 발생했습니다.", errorDetails: error.message });
  }
});



export default router;

