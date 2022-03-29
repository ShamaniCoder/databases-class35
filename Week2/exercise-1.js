const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'hyfuser',
    password : 'hyfpassword',
    database : 'exercisedb'
})

const execQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async () => {
    const CREATE_AUTHORS_TABLE = `
        CREATE TABLE IF NOT EXISTS authors (
            author_no INT Primary Key, 
            author_name VARCHAR(50), 
            university VARCHAR(255), 
            date_of_birth DATE, 
            h_index INT, 
            gender ENUM('m', 'f')
        );`;

    const ADD_MENTOR_COLUMN = `
        ALTER TABLE authors ADD mentor INT;
    `;
    
    const ADD_FOREIGN_KEY_MENTOR_COLUMN = `
        ALTER TABLE authors
        ADD FOREIGN KEY(mentor)
        REFERENCES authors(author_no);
    `;

    connection.connect();

    try {
        await execQuery(CREATE_AUTHORS_TABLE);
        await execQuery(ADD_MENTOR_COLUMN);
        await execQuery(ADD_FOREIGN_KEY_MENTOR_COLUMN);
    } catch (error) {
        console.error(error);
        connection.end();
    }

    connection.end();

};

seedDatabase();