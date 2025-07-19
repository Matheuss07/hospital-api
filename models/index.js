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

// Relacionamentos

// Médico pertence a uma especialidade
Medico.belongsTo(Especialidade);
Especialidade.hasMany(Medico);

// Consulta pertence a um paciente e um médico
Consulta.belongsTo(Paciente);
Consulta.belongsTo(Medico);
Paciente.hasMany(Consulta);
Medico.hasMany(Consulta);

// Prontuário pertence a um paciente
Prontuario.belongsTo(Paciente);
Paciente.hasOne(Prontuario); // supondo que tenha só um prontuário por paciente

// Sincroniza os models com o banco (opcional aqui)
await sequelize.sync({ alter: true }); // ou { force: true } para reiniciar tudo

// Exporta os models para uso nas rotas/controllers
export {
  sequelize,
  Medico,
  Paciente,
  Especialidade,
  Consulta,
  Prontuario,
  //Receitas
};
