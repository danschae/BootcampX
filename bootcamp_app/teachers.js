const { Pool } = require('pg');

const arg = process.argv.slice(2);

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `SELECT
FROM assistance_requests 
JOIN teachers ON teacher_id = teachers.id 
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teachers.name;`;

const values = [arg[0]]

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(` ${user.cohort}: ${user.teacher}`);
})})
.catch(err => console.error('query error', err.stack));