const express = require("express")
const { createReadStream } = require("fs")
const bodyParser = require('body-parser');
const db = require('./db.js')


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  createReadStream("./src/index.html").pipe(res)
})

app.get('/main.css', (req, res) => {
  createReadStream("./src/main.css").pipe(res)
})



app.post('/dataLogin', (req, res) => {

  const {username, userpassword} = req.body;

  console.log(username, userpassword);

  if (username != '' && userpassword != '') {
    db.connect()
    db.execute(`insert into users values(default, "${username}", "${userpassword}")`, 
    res => {
      console.log(res);
    })
  }

  createReadStream("./src/index.html").pipe(res)
})

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`http://localhost: ${PORT}`);



// db.connect()
// // db.execute(
// //   'insert into users values(default, "leonea", "leo@gamil.com", "1234")',
// //   res => {
// //     console.log(res);
// //   })


// db.execute('select * from users', (data) => {
//   console.log(data);
// });
