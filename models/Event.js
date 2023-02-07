const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Event extends Model {}

Event.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
        event_time:{
            type: DATE,
            allowNull: false
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            default: NOW,
        },
        venue: {
            type: DataTypes.STRING
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        
        },
        img_source: {
            type: DataTypes.STRING,
            allowNull: true
        } 

},
{
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: "event",
})