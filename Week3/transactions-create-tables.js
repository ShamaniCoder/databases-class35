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
    const CREATE_ACCOUNT_TABLE = `
        CREATE TABLE account(
            account_number INT PRIMARY KEY,
            balance DECIMAL(15,2)
        );`;
    
    const CREATE_ACCOUNT_CHANGES_TABLE = `
        CREATE TABLE account_changes (
            change_number INT AUTO_INCREMENT, 
            account_number INT, 
            amount DECIMAL(15,2), 
            changed_date DATE, 
            remark VARCHAR(255),
            PRIMARY KEY (change_number),
            FOREIGN KEY (account_number) REFERENCES account(account_number)
        );`;
    
    connection.connect();

    try {
        await execQuery('START TRANSACTION');

        await execQuery(CREATE_ACCOUNT_TABLE);
        await execQuery(CREATE_ACCOUNT_CHANGES_TABLE)

        await execQuery('COMMIT');
    } catch (error){
        console.error(error);
        await execQuery('ROLLBACK');
        connection.end();
    }
    
    connection.end();
}

seedDatabase();