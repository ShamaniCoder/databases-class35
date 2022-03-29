const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "exercisedb",
});

const execQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async () => {
  const CREATE_RESEARCH_PAPERS_TABLE = `
    CREATE TABLE IF NOT EXISTS research_papers (
      paper_id INT PRIMARY KEY,
      paper_title VARCHAR(255),
      conference VARCHAR(255),
      publish_date DATE
    );`;

  const CREATE_RESEARCH_PAPERS_AUTHORS_TABLE = `
    CREATE TABLE IF NOT EXISTS research_papers_authors (
      id INT PRIMARY KEY,
      author_no INT,
      paper_id INT,
      FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id),
      FOREIGN KEY(author_no) REFERENCES authors(author_no)
      );`;
  const CANCEL_FK_CHECK = "SET FOREIGN_KEY_CHECKS = 0;";
  const INSERT_VALUES_AUTHORS = `
    INSERT INTO 
        authors (author_no, author_name, university, date_of_birth, h_index, gender, mentor) 
    VALUES  
        (100, 'George', 'University of Helsinki', '1985-03-08', 27, 'm', 101),
        (101, 'Ali', 'University of Edinburgh', '1987-11-06', 35, 'm', 102),
        (102, 'Aykut', 'Harvard University', '1980-11-05', 22, 'm', 103),
        (103, 'Stephen', 'University of Berlin', '1970-09-08', 40, 'm', 104),
        (104, 'McCarthy', 'University of Dublin', '1995-01-11', 32, 'm', 105),
        (105, 'Talha', 'University of Colombia', '1995-04-12', 39, 'm', 106),
        (106, 'Burak', 'Ankara University', '1994-08-15', 50, 'm', 107),
        (107, 'Ensar', 'Istanbul University', '1984-03-16', 69, 'm', 108),
        (108, 'Federico', 'University of Amsterdam', '1982-10-15', 59, 'm', 110),
        (109, 'Basher', 'University of Damascus', '1990-02-15', 33, 'm', 111),
        (110, 'Ashley', 'Oxford University', '1982-09-13', 38, 'f', 112),
        (111, 'Ayshe', 'Middle East University', '1980-08-22', 12, 'f', 113),
        (112, 'Helen', 'Pitsburg University', '1989-03-12', 56, 'f', 114),
        (113, 'Nico', 'Oslo University', '1978-03-03', 52, 'm', 109),
        (114, 'Anna', 'University of New York', '1983-05-29', 28, 'f', 100 )  
    `;

  const INSERT_RESEARCH_PAPERS = `
    INSERT INTO 
        research_papers (paper_id, paper_title, conference, publish_date) 
    VALUES 
        (301, 'Basic Javascript', 'Introduction to Javascript', '2021-02-12'),
        (302, 'Queries in MYSQL', 'Queries in MYSQL', '2020-01-27'),
        (303, 'Variables in JS', 'Variables in JS', '2020-01-12'),
        (304, 'ES6 in CSS', 'ES6 in CSS', '2020-01-10'),
        (305, 'Bootstrap','Bootstrap Conference', '2015-01-22'),
        (306, 'UI', 'UI Conference', '2015-01-26'),
        (307, 'Waterfall','Waterfall Conference', '2015-01-28'),
        (308, 'Endangered species', 'Energy Conf', '2009-04-12'),
        (309, 'Scrum','Scrum Conference', '2015-01-30'),
        (310, 'Github', 'Github Conference', '2015-01-17'),
        (311, 'React Components', 'Js Conf', '2021-05-10'),
        (312, 'Vuex State Management', 'Js Conf', '2022-01-25'),
        (313, 'Vue3', 'Vue Conf', '2021-04-11'),
        (314, 'React7', 'React Conf', '2022-06-04'),
        (315, 'Obesity', 'Health Conf', '2017-05-30'), 
        (316, 'Promises', 'Js Conference', '2010-05-03'),
        (317, 'Java Classes', 'Java Conf', '1992-11-10'),
        (318, 'Closures', 'Js Conference', '2006-10-20'),
        (319, 'Exercise and Fitness', 'Health Conf', '2000-11-10'),
        (320, 'Fast Foods', 'Health Conf', '2017-06-07'),
        (321, 'C++','C++ Conference','2020-02-13'),
        (322, 'Recycling', 'Energy Conf', '2003-10-28'),
        (323, 'Alternative Fuel', 'Energy Conf', '2020-04-12'),
        (324, 'React Native', 'React Native Conference', '2015-01-15'),
        (325, 'Kanban','Kanban Conference', '2015-01-29'),
        (326, 'React Lifecycle', 'Js Conf', '2022-03-10'),
        (327, 'Node Js Modules', 'Js Conf', '2022-02-25'),
        (328, 'Express with Vue Ls', 'Vue Conf', '2021-08-11'),
        (329, 'React Redux', 'React Conf', '2020-06-04'),
        (330, 'Java', 'Java Conference', '2015-01-11')
    `;

  const INSERT_RESEARCH_PAPERS_AUTHORS = `
    INSERT INTO 
        research_papers_authors (id,author_no, paper_id) 
    VALUES 
        (1, 100, 301),
        (3, 100, 303),
        (4, 100, 326),
        (5, 100, 329),
        (6, 101, 303),
        (7, 101, 312),
        (8, 101, 313),
        (9, 103, 302),
        (10, 103, 324),
        (11, 103, 325),
        (12, 104, 304),
        (13, 105, 305),
        (14, 105, 319),
        (15, 105, 320),
        (16, 106, 305),
        (17, 106, 307),
        (18, 108, 308),
        (19, 108, 309),
        (20, 108, 327),
        (21, 108, 328),
        (22, 109, 310),
        (23, 110, 311),
        (24, 111, 312), 
        (25, 111, 330),
        (26, 111, 313),
        (27, 112, 313),
        (28, 112, 314),
        (29, 112, 315),
        (30, 112, 316),
        (31, 113, 317),
        (32, 113, 323),
        (33, 114, 318),
        (34, 114, 321),
        (35, 114, 322)
    `;

  connection.connect();

  try {
    await execQuery(CREATE_RESEARCH_PAPERS_TABLE);
    await execQuery(CREATE_RESEARCH_PAPERS_AUTHORS_TABLE);
    await execQuery(CANCEL_FK_CHECK);
    await execQuery(INSERT_VALUES_AUTHORS);
    await execQuery(INSERT_RESEARCH_PAPERS);
    await execQuery(INSERT_RESEARCH_PAPERS_AUTHORS);
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
};

seedDatabase();
