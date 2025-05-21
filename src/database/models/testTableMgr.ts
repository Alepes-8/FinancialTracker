var dbmanager = require('../dbmanager');
var db = dbmanager.db;

exports.getExpense = () => {
    const sqlQuary  = "SELECT * FROM EXPENSES"
    let statement = db.prepare(sqlQuary);
    let result = statement.all();
    return result;
}