import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Especialidades = sequelize.define('Especialidades', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        data: {
            type: DataTypes.DATEONLY,
            allowNull: false 
        },
        descricao: {
            type: DataTypes.STRING(255),
            allowNull: false
        }

    });

/*     Especialidades.associate = (models) => { //Relacionamento de duas tabelas
        Especialidades.hasMany(models.Medicos, { foreignKey: 'Especialidadesid' });
    };
 */
    return Especialidades;
}