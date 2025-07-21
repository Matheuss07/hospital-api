import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('Configuração do Ambiente de Testes', () => {
  it('Deve conectar ao banco PostgreSQL', async () => {
    await sequelize.authenticate();
    expect(sequelize.config.database).to.equal('hospital_test');
  });

  it('Deve criar um usuário no banco PostgreSQL', async () => {
    const Paciente = await db.Paciente.create({
        nome: 'Usuário Teste',
        email: 'teste123@gmail.com',
        senha: 'testApi',
    });

    expect(Paciente).to.have.property('id');
    expect(Paciente.email).to.equal('teste123@gmail.com');
    expect(Paciente.nome).to.equal('Usuário Teste');
  });
});