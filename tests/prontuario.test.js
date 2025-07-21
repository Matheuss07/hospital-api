import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('Prontuarios Model', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('Deve criar um prontuário válido', async () => {
    const prontuario = await db.Prontuario.create({
      descricao: 'Paciente com febre e dor de cabeça',
      data: new Date()
    });
    expect(prontuario).to.have.property('id');
  });
});