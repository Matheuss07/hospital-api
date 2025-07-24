import sequelize from "../config/db.js";
import medicosModel from './medicos.js';
import pacientesModel from './pacientes.js';
import especialidadeModel from './especialidade.js';
import consultaModel from './consulta.js';
import prontuariosModel from "./prontuarios.js";

// Inicializa os models
const Medico = medicosModel(sequelize);
const Paciente = pacientesModel(sequelize);
const Especialidade = especialidadeModel(sequelize);
const Consulta = consultaModel(sequelize);
const Prontuario = prontuariosModel(sequelize);

// RELACIONAMENTOS

// Médico pertence a uma especialidade
Medico.belongsTo(Especialidade, {
  foreignKey: 'EspecialidadeId',
  as: 'especialidade'
});
Especialidade.hasMany(Medico, {
  foreignKey: 'EspecialidadeId',
  as: 'medicos'
});

// Consulta pertence a um paciente e a um médico
Consulta.belongsTo(Paciente, {
  foreignKey: 'pacienteId',
  as: 'paciente'
});
Consulta.belongsTo(Medico, {
  foreignKey: 'medicoId',
  as: 'medico'
});
Paciente.hasMany(Consulta, {
  foreignKey: 'pacienteId',
  as: 'consultas'
});
Medico.hasMany(Consulta, {
  foreignKey: 'medicoId',
  as: 'consultas'
});

// Prontuário pertence a um paciente
Prontuario.belongsTo(Paciente, {
  foreignKey: 'pacienteId',
  as: 'paciente'
});
Paciente.hasOne(Prontuario, {
  foreignKey: 'pacienteId',
  as: 'prontuario'
});

// Exporta os models para uso nas rotas/controllers
export {
  sequelize,
  Medico,
  Paciente,
  Especialidade,
  Consulta,
  Prontuario
};