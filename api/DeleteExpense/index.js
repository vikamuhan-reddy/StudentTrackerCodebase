const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {
  try {
    // Accept rowKey from query or body
    const rowKey = (req.query && req.query.rowKey) || (req.body && req.body.rowKey);
    if (!rowKey) {
      context.res = { status: 400, body: { error: "rowKey required (query or body)" } };
      return;
    }

    const connectionString = process.env.STORAGE_CONNECTION_STRING;
    const tableClient = TableClient.fromConnectionString(connectionString, "ExpenseTable");

    await tableClient.deleteEntity("expense", rowKey);

    context.res = { status: 200, body: { message: "Expense deleted", rowKey } };
  } catch (err) {
    context.log.error(err);
    context.res = { status: 500, body: { error: err.message } };
  }
};
