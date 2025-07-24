import { expect } from 'chai';
import { sequelize, Consulta, Paciente, Medico } from '../models/index.js';

describe('Modelo Consulta', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  let paciente, medico;

  beforeEach(async () => {
    paciente = await Paciente.create({
      nome: 'Paciente A',
      email: `paciente${Date.now()}@teste.com`,
      telefone: '82999990000',
      senha: 'senha123'
    });

    medico = await Medico.create({
      nome: 'Médico B',
      email: `medico${Date.now()}@teste.com`,
      senha: 'senha123'
    });
  });

  it('Deve criar uma consulta válida', async () => {
    const consulta = await Consulta.create({
      data: '2025-08-01',
      hora: '14:00',
      descricao: 'Consulta geral',
      pacienteId: paciente.id,
      medicoId: medico.id
    });

    expect(consulta).to.have.property('id');
    expect(consulta.descricao).to.equal('Consulta geral');
  });

  it('Deve associar consulta com paciente e médico', async () => {
    const consulta = await Consulta.create({
      data: '2025-08-01',
      hora: '14:00',
      descricao: 'Consulta com cardiologista',
      pacienteId: paciente.id,
      medicoId: medico.id
    });

    const pacienteConsulta = await consulta.getPaciente();
    const medicoConsulta = await consulta.getMedico();

    expect(pacienteConsulta.id).to.equal(paciente.id);
    expect(medicoConsulta.id).to.equal(medico.id);
  });

  it('Não deve criar consulta sem data ou hora', async () => {
    try {
      await Consulta.create({
        descricao: 'Consulta sem data e hora',
        pacienteId: paciente.id,
        medicoId: medico.id
      });
    } catch (err) {
      expect(err.name).to.equal('SequelizeValidationError');
      const paths = err.errors.map(e => e.path);
      expect(paths).to.include.members(['data', 'hora']);
    }
  });

  it('Não deve criar consulta sem médico ou paciente', async () => {
    try {
      await Consulta.create({
        data: '2025-08-01',
        hora: '15:00',
        descricao: 'Consulta incompleta'
      });
    } catch (err) {
      expect(err.name).to.equal('SequelizeForeignKeyConstraintError');
    }
  });
});
//fim