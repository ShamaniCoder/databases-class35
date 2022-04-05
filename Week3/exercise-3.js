const prompt = require("prompt");
const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
  multipleStatements: true,
});

const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));

async function queryDatabase() {
  let country = "";
  let name = "";
  let code = "";

  prompt.start();

  try {
    const input1 = await input(["country"]);
    const input2 = await input(["name"]);
    const input3 = await input(["code"]);

    country = input1.country;
    name = input2.name;
    code = input3.code;

    const select_query = `select Population from ${country} WHERE name = ${connection.escape(
      name
    )} and code = ${connection.escape(code)}`;

    connection.connect();

    console.log(select_query);

    const results = await execQuery(select_query);

    for (let r of results) {
      console.log(r);
    }
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

queryDatabase();
