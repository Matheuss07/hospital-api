import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/db.js';

// Importa os modelos para garantir que eles sejam carregados
import './models/index.js'; // ou importe os modelos individualmente, se necessário

// Importação das rotas
import consultaRouter from './routers/consultaRouters.js';
import especialidadeRouter from './routers/especialidadeRouters.js';
import medicosRouter from './routers/medicosRouters.js';
import pacientesRouter from './routers/pacientesRouters.js';
import prontuarioRouter from './routers/prontuarioRouters.js';
/* import receitasRouter from './routers/receitasRouters.js'; */

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Rota simples para checagem
app.get('/version', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0' });
});

// Rotas principais
app.use('/consultas', consultaRouter);
app.use('/especialidades', especialidadeRouter);
app.use('/medicos', medicosRouter);
app.use('/pacientes', pacientesRouter);
app.use('/prontuarios', prontuarioRouter);
/* app.use('/receitas', receitasRouter); */

// Conecta e inicia o servidor
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Banco de dados sincronizado com sucesso.');
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao sincronizar com o banco:', err);
  });