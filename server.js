import express from 'express';
import { sequelize, Prontuario, Medico, Paciente, Especialidade, Consulta } from './models/index.js';
import pacientes from './models/pacientes.js';

const app = express();
app.use(express.json());

// Rotas (você pode importar e usar os arquivos de rotas separados aqui)

// Inicializa o banco e inicia o servidor
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');

    await sequelize.sync({ alter: true });
    console.log('✅ Tabelas sincronizadas com sucesso.');

    const paciente = await Paciente.create({
        nome:'Matheus Luna',
        email:'msl@gmail.com',
        senha:'testeApi'
    })
  } catch (error) {
    console.error('❌ Erro ao conectar ou sincronizar o banco de dados:', error);
  }
  finally {
    await sequelize.close();
  }
};

startServer();