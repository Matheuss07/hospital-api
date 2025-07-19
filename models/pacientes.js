import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Pacientes = sequelize.define('Pacientes', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: { isEmail: true },
        },
        senha: {
            type: DataTypes.STRING(8),
            allowNull: false,
            validate: {
                len: {
                    args: [6, 100],
                    msg: 'A senha deve conter no mínimo 6 dígitos'
                }
            }
        },

    });

    return Pacientes;
}