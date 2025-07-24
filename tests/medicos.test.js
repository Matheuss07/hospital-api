import { expect } from 'chai';
import { sequelize, Medico, Especialidade } from '../models/index.js';

describe('Modelo Medico', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  let especialidade;

  beforeEach(async () => {
    especialidade = await Especialidade.create({ nome: 'Cardiologia' });
  });

it('Não deve criar médico sem nome', async () => {
    try {
      await Medico.create({
        email: `semnome${Date.now()}@teste.com`,
        senha: 'senha123',
        EspecialidadeId: especialidade.id
      });
    } catch (err) {
      expect(err.name).to.equal('SequelizeValidationError');
      expect(err.errors[0].path).to.equal('nome');
    }
  });


  it('Deve criar um médico válido', async () => {
    const medico = await Medico.create({
      nome: 'Doutor João',
      email: `drjoao${Date.now()}@teste.com`,
      senha: 'senha123',
      EspecialidadeId: especialidade.id
    });

    expect(medico).to.have.property('id');
    expect(medico.nome).to.equal('Doutor João');
  });

  it('Não deve criar médico com e-mail inválido', async () => {
    try {
      await Medico.create({
        nome: 'Inválido',
        email: 'semArroba',
        senha: 'senha123',
        EspecialidadeId: especialidade.id
      });
    } catch (err) {
      expect(err.name).to.equal('SequelizeValidationError');
      expect(err.errors[0].path).to.equal('email');
    }
  });

  it('Não deve criar médico com senha menor que 6 caracteres', async () => {
    try {
      await Medico.create({
        nome: 'Curto',
        email: `curto${Date.now()}@teste.com`,
        senha: '123',
        EspecialidadeId: especialidade.id
      });
    } catch (err) {
      expect(err.name).to.equal('SequelizeValidationError');
      expect(err.errors[0].path).to.equal('senha');
    }
  });
});
//fim