// src/routes/menus.router.js

import express from 'express';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router({mergeParams: true});

/**메뉴 생성 API **/
router.post(
  '/', async (req, res, next) => {
    try{
      const { name, description, image, price } = req.body;
      const { categoryId } = req.params;

      // 필수 필드 확인
      if (!name || !description || !image || price === undefined || !categoryId) {
        return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
      }

      // categoryId에 해당하는 카테고리 존재 여부 확인
      const existingCategory = await prisma.categories.findUnique({
        where: { Id: parseInt(categoryId) },
      });
      if (!existingCategory) {
        return res.status(404).json({ message: '존재하지 않는 카테고리입니다.' });
      }

      // 메뉴 가격이 0보다 작은 경우 확인
      if (price < 0) {
        return res.status(400).json({ message: '메뉴 가격은 0보다 작을 수 없습니다.' });
      }

      const lastMenu = await prisma.menus.findFirst({
        orderBy: {
          order: 'desc',
        },
      });
      const newOrder = lastMenu ? lastMenu.order + 1 : 1;
  
      const newMenu = await prisma.menus.create({
        data: {
          name,
          description,
          image,
          price,
          categoriesId: parseInt(categoryId),
          order : newOrder 
        }
      });

      return res.status(201).json({ message: '메뉴를 등록하였습니다.' });
      }catch (error){
      return res.status(500).json({ })
    }
  }
);

/** 메뉴 조회 API **/
router.get(
  '/', async (req, res, next) => {
    try{
      // categoryId에 해당하는 카테고리 존재 여부 확인
      const existingCategory = await prisma.categories.findUnique({
        where: { Id: +req.params.categoryId },
      });
      if (!existingCategory) {
        return res.status(404).json({ message: '존재하지 않는 카테고리입니다.' });
      }
    
      const showmenu = await prisma.menus.findMany({
        select: {
          Id: true,
          name: true,
          image: true,
          price: true,
          order: true,
          status: true
        },
        orderBy: {
          order: 'desc', // 게시글을 최신순으로 정렬합니다.
        },
      });

  
      return res.status(200).json({ data: showmenu });
    }catch(error){
      return res.status(500).json({ })
    }
  });

export default router;