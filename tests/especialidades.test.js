import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('Especialidade Model', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('Deve criar uma especialidade válida', async () => {
    const esp = await db.Especialidade.create({ 
        nome: 'Cardiologia',
        
    });
    expect(esp).to.have.property('id');
    expect(esp.nome).to.equal('Cardiologia');
  });

  it('Não deve criar sem nome', async () => {
    try {
      await db.Especialidade.create({});
      expect.fail('Deveria falhar');
    } catch (err) {
      expect(err.name).to.equal('SequelizeValidationError');
    }
  });
});
