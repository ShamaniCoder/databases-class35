const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const UPDATE_SENT_BALANCE = `
                      UPDATE account
                      SET balance = balance - 1000
                      WHERE account_number = 101;`;
  const UPDATE_RECEIVED_BALANCE = `
                      UPDATE account
                      SET balance = balance + 1000
                      WHERE account_number = 102;`;

  const INSERT_TRANSACTIONS_TO_ACCOUNT_CHANGES = `
    INSERT INTO 
        account_changes(account_number, amount, changed_date, remark)
     VALUES 
        (101, 1000, '2022-04-04 11:18:12', 'Sent'),
        (102, 1000, '2022-04-04 22:18:32', 'Received');`;

  connection.connect();

  try {
    await execQuery("START TRANSACTION");

    await execQuery(UPDATE_SENT_BALANCE);
    await execQuery(UPDATE_RECEIVED_BALANCE);
    await execQuery(INSERT_TRANSACTIONS_TO_ACCOUNT_CHANGES);

    await execQuery("COMMIT");
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
  }

  connection.end();
}

seedDatabase();
