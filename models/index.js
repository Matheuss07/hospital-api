import sequelize from "../config/db.js";
import medicosModel from './medicos.js';
import pacientesModel from './pacientes.js';
import especialidadeModel from './especialidade.js';
import consultaModel from './consulta.js';
import prontuariosModel from "./prontuarios.js";

const medico = medicosModel(sequelize);
const paciente = pacientesModel(sequelize);
const especialidade =  especialidadeModel(sequelize);
const consulta = consultaModel(sequelize);
const prontuario = prontuariosModel(sequelize);