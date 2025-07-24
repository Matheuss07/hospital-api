import { expect } from 'chai';
import { sequelize, Prontuario, Paciente } from '../models/index.js';

describe('Modelo Prontuario', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  let paciente;

  beforeEach(async () => {
    paciente = await Paciente.create({
      nome: 'Paciente Prontuário',
      email: `prontuario${Date.now()}@teste.com`,
      telefone: '82999998888',
      senha: 'senha123'
    });
  });
  it('Não deve criar prontuário sem descrição', async () => {
    try {
      await Prontuario.create({
        data: '2025-07-23',
        pacienteId: paciente.id
        // descrição ausente
      });
    } catch (err) {
      expect(err.name).to.equal('SequelizeValidationError');
      expect(err.errors[0].path).to.equal('descricao');
    }
  });
  it('Deve criar um prontuário válido', async () => {
    const prontuario = await Prontuario.create({
      data: '2025-07-20',
      descricao: 'Paciente apresentou sintomas gripais',
      pacienteId: paciente.id
    });

    expect(prontuario).to.have.property('id');
    expect(prontuario.descricao).to.include('sintomas');
  });

  it('Deve associar prontuário ao paciente', async () => {
    const prontuario = await Prontuario.create({
      data: '2025-07-22',
      descricao: 'Evolução clínica estável',
      pacienteId: paciente.id
    });

    const associado = await prontuario.getPaciente();
    expect(associado.id).to.equal(paciente.id);
  });
});
//fim