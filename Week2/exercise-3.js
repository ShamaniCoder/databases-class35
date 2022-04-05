const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "exercisedb",
});

connection.connect();

const execQuery = (query) => {
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    } else {
      console.table(results);
    }
  });
};

const PRINT_AUTHORS_MENTORS = `
SELECT 
  a.author_no, a.author_name as author , m.author_name as mentor
FROM
  authors a
INNER JOIN authors m ON 
a.mentor = m.author_no;
`;

const PRINT_AUTHORS_AND_PAPERS = `
SELECT 
  authors.*, research_papers.paper_title 
FROM 
  authors 
LEFT JOIN 
  research_papers_authors 
ON 
  research_papers_authors.author_no = authors.author_no left
JOIN 
  research_papers 
ON 
  research_papers_authors.paper_id = research_papers.paper_id;`;

execQuery(PRINT_AUTHORS_MENTORS);
execQuery(PRINT_AUTHORS_AND_PAPERS);

connection.end();
