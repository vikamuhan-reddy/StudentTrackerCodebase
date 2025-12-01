const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {
    const { rowKey } = req.query;

    const connectionString = process.env.STORAGE_CONNECTION_STRING;
    const tableClient = TableClient.fromConnectionString(connectionString, "ExpenseTable");

    await tableClient.deleteEntity("expense", rowKey);

    return {
        status: 200,
        body: { message: "Expense deleted!" }
    };
};
