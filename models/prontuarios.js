import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Prontuario = sequelize.define('Prontuario', {
        id: { // Identificador proprio para cada prontuário
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        data: {
            type: DataTypes.DATEONLY,
            allowNull: false // A data do prontuário deverá ser registrada para uma melhor análise
        },
        descricao: {
            type: DataTypes.STRING(255),
            allowNull: false //O prontuário deverá ao menos ter uma descricao
        }

    });

    Prontuario.associate = (models) => { //Relacionamento de duas tabelas
        Prontuario.belongsTo(models.Pacientes, { foreignKey: 'pacientesid' });
        Prontuario.belongsTo(models.Medicos, { foreignKey: 'medicosid' });
    };

    return Prontuario;
}