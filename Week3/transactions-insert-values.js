const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: "userdb"
})

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
    INSERT_INTO_ACCOUNT_TABLE = `
    INSERT INTO 
        account(account_number, balance)
    VALUES
        (101, 6000.00),
        (102, 4000.00),
        (103, 3000.00),
        (104, 2000.00);
    `;
    
    const INSERT_INTO_ACCOUNT_CHANGES_TABLE = `
    INSERT INTO 
        account_changes(account_number, amount, changed_date, remark)
    VALUES
        (101, 1000.00, '2022-04-05','sent'),
        (102, 2000.00, '2022-04-04', 'sent'),
        (103, 1500.00, '2022-04-03', 'received'),
        (104, 2000.00, '2022-04-02', 'sent');
    `;
  connection.connect();

  try {
    await execQuery("START TRANSACTION");

    await execQuery(INSERT_INTO_ACCOUNT_TABLE);
    await execQuery(INSERT_INTO_ACCOUNT_CHANGES_TABLE);

    await execQuery("COMMIT");
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
    connection.end();
  }

  connection.end();
};

seedDatabase();