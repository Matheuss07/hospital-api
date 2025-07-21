import { Router } from 'express';
import { Paciente } from '../models/index.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pacientes' });
  }
});

router.post('/', async (req, res) => {
  try {
    const novo = await Paciente.create(req.body);
    res.status(201).json(novo);
  } catch (error) {
    console.error('Erro ao criar paciente:', error); 
    res.status(400).json({ error: error.message }); 
  }
});

export default router;
