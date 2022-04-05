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

const RESEARCH_PAPERS_AND_NUMBER_OF_AUTHORS = `
SELECT 
    research_papers.paper_title, count(research_papers_authors.author_no) AS number_of_authors 
FROM 
    research_papers 
JOIN 
    research_papers_authors 
ON 
    research_papers.paper_id = research_papers_authors.paper_id 
GROUP BY 
    research_papers.paper_title;
`;

const RESEARCH_PAPERS_PUBLISHED_BY_FEMALE_AUTHORS = `
SELECT 
    gender, COUNT(research_papers_authors.paper_id) AS sum_of_published_papers
FROM 
    authors 
JOIN 
    research_papers_authors 
ON 
    research_papers_authors.author_no = authors.author_no 
GROUP BY 
    gender 
HAVING 
    gender = 'f';
  `;

const AVG_OF_H_INDEX_BY_PER_UNIVERSITY = `
SELECT 
    university, AVG(h_index) AS average_h_index 
FROM
    authors 
GROUP BY
    university;
  `;

const SUM_OF_RESEARCH_PAPERS_OF_AUTHORS_BY_PER_UNIVERSITY = `
SELECT 
    university, COUNT(research_papers_authors.paper_id) AS sum_of_research_papers 
FROM
    authors 
JOIN 
    research_papers_authors 
ON 
    research_papers_authors.author_no = authors.author_no 
GROUP BY 
    university;
  `;

const MIN_MAX_H_INDEX_BY_PER_UNIVERSITY = `
SELECT 
    university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
FROM
    authors 
GROUP BY 
    university;
  `;

execQuery(RESEARCH_PAPERS_AND_NUMBER_OF_AUTHORS);
execQuery(RESEARCH_PAPERS_PUBLISHED_BY_FEMALE_AUTHORS);
execQuery(AVG_OF_H_INDEX_BY_PER_UNIVERSITY);
execQuery(SUM_OF_RESEARCH_PAPERS_OF_AUTHORS_BY_PER_UNIVERSITY);
execQuery(MIN_MAX_H_INDEX_BY_PER_UNIVERSITY);

connection.end();
