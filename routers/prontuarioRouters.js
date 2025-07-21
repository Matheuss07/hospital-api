import { Router } from 'express';
import { Prontuario } from '../models/index.js';

const router = Router();

router.get('/', async (req, res) => {
  const lista = await Prontuario.findAll();
  res.json(lista);
});

router.post('/', async (req, res) => {
  const novo = await Prontuario.create(req.body);
  res.status(201).json(novo);
});

export default router;
