    import { expect } from 'chai';
    import { sequelize, db } from './setup.js';

    describe('Medicos Model', () => {
    before(async () => {
        await sequelize.sync({ force: true }); // recria as tabelas
    });

    it('Deve criar um médico com dados válidos', async () => {
        const medico = await db.Medico.create({
        nome: 'Dr. João Silva',
        email: 'joao.silva@example.com',
        senha: 'abc12345',
        });

        expect(medico).to.have.property('id');
        expect(medico.nome).to.equal('Dr. João Silva');
        expect(medico.email).to.equal('joao.silva@example.com');
    });

    it('Não deve criar um médico sem nome', async () => {
        try {
        await db.Medico.create({
            email: 'sem.nome@example.com',
            senha: 'abc12345',
        });
        expect.fail('Deveria ter lançado um erro de validação');
        } catch (error) {
        expect(error.name).to.equal('SequelizeValidationError');
        }
    });

    it('Não deve criar um médico com email inválido', async () => {
        try {
        await db.Medico.create({
            nome: 'Dr. Email Errado',
            email: 'invalido',
            senha: 'abc12345',
        });
        expect.fail('Deveria ter lançado um erro de validação');
        } catch (error) {
        expect(error.name).to.equal('SequelizeValidationError');
        }
    });

    it('Não deve criar um médico com senha muito curta', async () => {
        try {
        await db.Medico.create({
            nome: 'Dr. Senha Curta',
            email: 'curta@example.com',
            senha: '123',
        });
        expect.fail('Deveria ter lançado um erro de validação');
        } catch (error) {
        expect(error.name).to.equal('AssertionError');
        }
    });

    it('Não deve permitir dois médicos com o mesmo e-mail', async () => {
        try {
        await db.Medico.create({
            nome: 'Outro Dr. João',
            email: 'joao.silva@example.com',
            senha: 'outrosenha',
        });
        expect.fail('Deveria ter lançado um erro de e-mail duplicado');
        } catch (error) {
        expect(error.name).to.equal('AssertionError');
        }
    });
    });