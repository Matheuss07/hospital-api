import { Router } from 'express';
import { Especialidade } from '../models/index.js';

const router = Router();

router.get('/', async (req, res) => {
  const lista = await Especialidade.findAll();
  res.json(lista);
});

router.post('/', async (req, res) => {
  const novo = await Especialidade.create(req.body);
  res.status(201).json(novo);
});

export default router;
