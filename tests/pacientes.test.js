import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('Pacientes Model', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('Deve criar paciente válido', async () => {
    const paciente = await db.Paciente.create({
      nome: 'Maria dos Santos',
      email: 'msl@example.com',
      telefone: '82999999999',
      senha: '12345678'
    });
    expect(paciente).to.have.property('id');
    expect(paciente.nome).to.equal('Maria dos Santos');
  });

  it('Não deve criar sem CPF', async () => {
    try {
      await db.Paciente.create({ nome: 'Fulano', telefone: '82000000000' });
      expect.fail('Deveria falhar');
    } catch (err) {
      expect(err.name).to.equal('SequelizeValidationError');
    }
  });
});