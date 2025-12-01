const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {
    const connectionString = process.env.STORAGE_CONNECTION_STRING;
    const tableClient = TableClient.fromConnectionString(connectionString, "ExpenseTable");

    let expenses = [];
    for await (const entity of tableClient.listEntities()) {
        expenses.push(entity);
    }

    return {
        status: 200,
        body: expenses
    };
};
