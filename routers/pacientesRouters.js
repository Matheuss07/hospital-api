/* import express from 'express';
import  Paciente  from '../models/index.js'
import { Op }  from 'sequelize';

const router = express.Router();

router.get('/search', async (req, res) => {
console.log('search')
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Parâmetro "q" é obrigatório' });
  }

  try {
    const paciente = await Paciente.findAll({
      where: {
        [Op.or]: [
          { nome: { [Op.iLike]: `%${q}%` } },
          { email: { [Op.iLike]: `%${q}%` } },
          { senha: { [Op.iLike]: `%${q}%` } },
        ],
      },
    });

    res.json(paciente);
  } catch (err) {
    res.status(500).json({ error: 'Error na busca', details: err });
  }

}) */