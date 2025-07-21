import { Router } from 'express';
import { Consulta } from '../models/index.js';

const router = Router();

router.get('/', async (req, res) => {
  const lista = await Consulta.findAll();
  res.json(lista);
});

router.post('/', async (req, res) => {
  const novo = await Consulta.create(req.body);
  res.status(201).json(novo);
});

export default router;
