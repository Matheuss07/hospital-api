import { expect } from 'chai';
import { sequelize, db } from './setup.js';

describe('Consulta Model', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('Deve criar uma consulta válida', async () => {
    const consulta = await db.Consulta.create({
      data: new Date(),
      descricao: 'Consulta de rotina',
      hora: '14:30:00'
    });
    expect(consulta).to.have.property('id');
  });
});