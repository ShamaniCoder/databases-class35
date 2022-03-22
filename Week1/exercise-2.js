import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});

connection.connect();

const showErrorResult = (error, result) => {
  if (error) throw error;
  console.log(result);
};

connection.query(
  "SELECT Name FROM country WHERE Population > 8000000;",
  showErrorResult
);

connection.query(
  "SELECT Name FROM country WHERE Name LIKE '%land%'",
  showErrorResult
);

connection.query(
  "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000",
  showErrorResult
);

connection.query(
  "SELECT Name FROM country WHERE Continent = 'Europe'",
  showErrorResult
);

connection.query(
  "SELECT Name FROM country ORDER BY SurfaceArea DESC",
  showErrorResult
);

connection.query(
  "SELECT Name FROM city WHERE CountryCode = 'NLD'",
  showErrorResult
);

connection.query(
  "SELECT Population FROM city WHERE Name = 'Rotterdam'",
  showErrorResult
);

connection.query(
  "SELECT * FROM country ORDER BY SurfaceArea DESC LIMIT 10",
  showErrorResult
);

connection.query(
  "SELECT * FROM city ORDER BY Population DESC LIMIT 10",
  showErrorResult
);

connection.query("SELECT SUM(Population) FROM country", showErrorResult);

connection.end();
