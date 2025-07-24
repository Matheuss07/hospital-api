import { expect } from 'chai';
import { sequelize, Paciente } from '../models/index.js';

describe('Modelo Paciente', () => {
  before(async () => {
    await sequelize.sync({ force: true }); // reseta o banco antes dos testes
  });

  it('Deve criar um paciente válido', async () => {
    const paciente = await Paciente.create({
      nome: 'João da Silva',
      email: `joao${Date.now()}@teste.com`,
      telefone: '82988887777',
      senha: 'senha123'
    });

    expect(paciente).to.have.property('id');
    expect(paciente.nome).to.equal('João da Silva');
  });

  it('Não deve criar paciente com e-mail inválido', async () => {
    try {
      await Paciente.create({
        nome: 'Inválido',
        email: 'email_invalido',
        telefone: '82988887777',
        senha: 'senha123'
      });
    } catch (err) {
      expect(err.name).to.equal('SequelizeValidationError');
      expect(err.errors[0].path).to.equal('email');
    }
  });

  it('Não deve criar paciente sem nome', async () => {
    try {
      await Paciente.create({
        email: `semnome${Date.now()}@teste.com`,
        telefone: '82988887777',
        senha: 'senha123'
      });
    } catch (err) {
      expect(err.name).to.equal('SequelizeValidationError');
      expect(err.errors[0].path).to.equal('nome');
    }
  });

  it('Não deve criar paciente com senha menor que 6 caracteres', async () => {
    try {
      await Paciente.create({
        nome: 'Teste Curto',
        email: `curto${Date.now()}@teste.com`,
        telefone: '82988887777',
        senha: '123'
      });
    } catch (err) {
      expect(err.name).to.equal('SequelizeValidationError');
      expect(err.errors[0].path).to.equal('senha');
    }
  });
});
