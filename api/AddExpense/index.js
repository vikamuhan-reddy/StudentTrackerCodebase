const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {
    const { amount, category, date } = req.body;

    const connectionString = process.env.STORAGE_CONNECTION_STRING;
    const tableClient = TableClient.fromConnectionString(connectionString, "ExpenseTable");

    const entity = {
        partitionKey: "expense",
        rowKey: Date.now().toString(),
        amount: amount,
        category: category,
        date: date
    };

    await tableClient.createEntity(entity);

    return {
        status: 200,
        body: { message: "Expense added!" }
    };
};
