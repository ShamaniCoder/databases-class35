import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});

connection.connect();

const showErrorResult = (error, result) => {
  if (error) throw error;
  console.log(result);
};

connection.query("DROP DATABASE IF EXISTS meetup", showErrorResult);

connection.query("CREATE DATABASE meetup", showErrorResult);

connection.query("USE meetup", showErrorResult);

connection.query(
  `CREATE TABLE Invitee(
    invitee_no INT, invitee_name VARCHAR(255), invited_by VARCHAR(255)
  )`,
  showErrorResult
);

connection.query(
  `CREATE TABLE Meeting(
      meeting_no INT, meeting_title VARCHAR(255), starting_time DATETIME, ending_time DATETIME, room_no INT
    )`,
  showErrorResult
);

connection.query(
  `CREATE TABLE Room(
      room_no INT, room_name VARCHAR(100), floor_number INT
    )`,
  showErrorResult
);

connection.query(
  `INSERT INTO Invitee (invitee_no, invitee_name, invited_by) 
    VALUES 
      (1, 'Mike', 'John'),
      (2, 'Nash', 'John'),
      (3, 'Jonathan', 'John'),
      (4, 'Mel', 'Elvis'),
      (5, 'McCarthy', 'Elton')`,
  showErrorResult
);

connection.query(
  `INSERT INTO Room (room_no, room_name, floor_number) 
      VALUES 
        (1001, 'Alpha', 1),
        (2001, 'Bravo', 2),
        (3001, 'Charlie', 3),
        (1002, 'Delta', 1),
        (2004, 'Echo', 2)`,
  showErrorResult
);

connection.query(
  `INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no)
    VALUES 
      (1, 'Web Development', '2022-05-13 10:30:00', '2022-05-13 15:30:00', 1001),
      (2, 'AWS-DevOps', '2022-05-16 10:00:00', '2022-05-16 13:30:00', 2001),
      (3, 'Data Science', '2022-05-17 10:00:00', '2022-05-17 14:00:00', 3001),
      (4, 'Cyber Security', '2022-06-06 09:00:00', '2022-06-06 15:00:00', 1002),
      (5, 'Salesforce', '2022-06-10 10:30:00', '2022-06-10 14:30:00', 2004)`,
  showErrorResult
);

connection.end();
