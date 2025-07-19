import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Medicos = sequelize.define('Medicos', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {isEmail: true},
        senha:{
            type: DataTypes.STRING(8),
            allowNull: false,
            validate: {
                len:{
                    args: [6, 100],
                    msg: 'A senha deve conter no mínimo 6 dígitos'
                }
            }
        },

    }
    });

/*     Medicos.associate = (models) => {
    Medicos.belongsTo(models.Especialidades, { foreignKey: 'especialidadeid' });
    Medicos.hasMany(models.Consulta, { foreignKey: 'medicoid' });
  }; */

    return Medicos;
}