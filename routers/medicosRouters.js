import { Router } from 'express';
import { Medico } from '../models/index.js';

const router = Router();

// GET todos os médicos
router.get('/', async (req, res) => {
  try {
    const medicos = await Medico.findAll();
    res.json(medicos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar médicos' });
  }
});

// POST novo médico
router.post('/', async (req, res) => {
  try {
    const novo = await Medico.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar médico' });
  }
});

export default router;
