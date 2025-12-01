const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {
  try {
    const connectionString = process.env.STORAGE_CONNECTION_STRING;
    const tableClient = TableClient.fromConnectionString(connectionString, "ExpenseTable");

    const expenses = [];
    for await (const entity of tableClient.listEntities()) {
      expenses.push(entity);
    }

    context.res = { status: 200, body: expenses };
  } catch (err) {
    context.log.error(err);
    context.res = { status: 500, body: { error: err.message } };
  }
};
