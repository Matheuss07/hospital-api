import sequelize from "../config/db.js";
import medicosModel from './medicos.js';
import pacientesModel from './pacientes.js';
import especialidadeModel from './especialidade.js';
import consultaModel from './consulta.js';
import prontuariosModel from "./prontuarios.js";


const Medico = medicosModel(sequelize);
const Paciente = pacientesModel(sequelize);
const Especialidade = especialidadeModel(sequelize);
const Consulta = consultaModel(sequelize);
const Prontuario = prontuariosModel(sequelize);




Medico.belongsTo(Especialidade, {
  foreignKey: 'EspecialidadeId',
  as: 'especialidade'
});
Especialidade.hasMany(Medico, {
  foreignKey: 'EspecialidadeId',
  as: 'medicos'
});


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


Prontuario.belongsTo(Paciente, {
  foreignKey: 'pacienteId',
  as: 'paciente'
});
Paciente.hasOne(Prontuario, {
  foreignKey: 'pacienteId',
  as: 'prontuario'
});


export {
  sequelize,
  Medico,
  Paciente,
  Especialidade,
  Consulta,
  Prontuario
};

//fim