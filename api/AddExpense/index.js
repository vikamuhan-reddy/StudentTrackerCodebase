const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {
  try {
    const { title, amount, date, category } = req.body || {};

    if (!title || !amount || !date) {
      context.res = { status: 400, body: { error: "title, amount and date required" } };
      return;
    }

    const connectionString = process.env.STORAGE_CONNECTION_STRING;
    const tableClient = TableClient.fromConnectionString(connectionString, "ExpenseTable");

    // Use a fixed partitionKey; rowKey must be unique
    const rowKey = Date.now().toString();

    const entity = {
      partitionKey: "expense",
      rowKey: rowKey,
      title: title,
      amount: Number(amount),
      date: date,
      category: category || ""
    };

    await tableClient.createEntity(entity);

    context.res = {
      status: 200,
      body: { message: "Expense added", rowKey }
    };
  } catch (err) {
    context.log.error(err);
    context.res = { status: 500, body: { error: err.message } };
  }
};
