import { expect } from 'chai';
import { sequelize, Especialidade, Medico } from '../models/index.js';

describe('Modelo Especialidade', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('Deve criar uma especialidade válida', async () => {
    const esp = await Especialidade.create({ nome: 'Ortopedia' });
    expect(esp).to.have.property('id');
    expect(esp.nome).to.equal('Ortopedia');
  });

   it('Não deve criar especialidade sem nome', async () => {
    try {
      await Especialidade.create({});
    } catch (err) {
      expect(err.name).to.equal('SequelizeValidationError');
      expect(err.errors[0].path).to.equal('nome');
    }
  });

  it('Deve associar médicos à especialidade', async () => {
    const esp = await Especialidade.create({ nome: 'Neurologia' });

    const medico = await Medico.create({
      nome: 'Doutora Ana',
      email: `ana${Date.now()}@teste.com`,
      senha: 'senha123',
      EspecialidadeId: esp.id
    });

    const medicos = await esp.getMedicos();
    expect(medicos).to.have.lengthOf(1);
    expect(medicos[0].nome).to.equal('Doutora Ana');
  });
});