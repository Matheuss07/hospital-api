import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Consulta = sequelize.define('Consulta', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        data: {
            type: DataTypes.DATEONLY,
            allowNull: false 
        },
            hora:{
                type:DataTypes.TIME,
                allowNull:false
        },
        descricao: {
            type: DataTypes.STRING(255),
            allowNull: false
        }

    });

  Consulta.associate = (models) => {
    Consulta.belongsTo(models.Paciente, { foreignKey: 'pacienteid' });
    Consulta.belongsTo(models.Medico, { foreignKey: 'medicoid' });
    //Consulta.hasOne(models.Receita, { foreignKey: 'consultaId' });
  };
    return Consulta;
}