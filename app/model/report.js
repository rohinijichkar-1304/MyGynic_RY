const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Reports = sequelize.define('report', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        ReportId: {
            type: Sequelize.INTEGER,
        },
        Condition: {
            type: Sequelize.STRING,
        },
        // Amount: {
        //     type: Sequelize.STRING,
        // },
        Count: {
            type: Sequelize.STRING,
        },
        ConditionPriority: {
            type: Sequelize.STRING,
        },
        IsMultipleCondition: {
            type: Sequelize.STRING,
        },

        
        
        
    });  
    return Reports;
}
