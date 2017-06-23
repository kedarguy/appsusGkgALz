const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


// This is my data (one day it will come from database)
// let items = [
//     {id: 8,title: 'Mastering SCSS', price: 78, description: 'bla bla'},
//     {id: 9,title: 'Mastering $', price: 8, description: 'jq bla bla'}
// ];
let currId = 5;
let puki = {
  userEmail: 'puki@puki.com',
  emails: []
}

let shuki = {
  userEmail: 'shuki@shuki.com',
  emails: [
    { id: 1 ,from: puki.userEmail, subject: '1', content: '1', isTrashed: false, isImportant: false, isRead: false},
    { id: 2 ,from: puki.userEmail, subject: '2', content: '2', isTrashed: false, isImportant: false, isRead: false},
    { id: 3 ,from: puki.userEmail, subject: '3', content: '3', isTrashed: false, isImportant: false, isRead: false},
    { id: 4 ,from: puki.userEmail, subject: '4', content: '4', isTrashed: false, isImportant: false, isRead: false},
  ]
}

let users = [puki, shuki];

let loggedInUser = shuki;

function getUserByEmail(emailAddress) {
  console.log('Email add')
  console.log(emailAddress)
  var answer = users.find(function (searchUser) {
    return searchUser.userEmail === emailAddress
  })
  return answer;
}

// *** REST API ***

app.get('/h', (request, response) => {
  response.send('Hello from Express!')
})


// LIST
app.get('/users', (req, res) => {
  //   setTimeout(()=>res.json(items), 2000);
  console.log('getting users')
  res.json(users);
})

app.get('/currUser', (req, res) => {
  console.log('getting curr user')
  //   setTimeout(()=>res.json(items), 2000);
  res.json(loggedInUser);
})




// CREATE
app.post('/newEmail', (req, res) => {
  const email = req.body;
  email.from = loggedInUser.userEmail;
  email.isTrashed = false;
  email.isImportant = false;
  loggedInUser.emails.push(email);
  var recieverUser = getUserByEmail(email.to);
  recieverUser.emails.push(email);
  res.json({ msg: 'email was sent!' });
})

// UPDATE - trashMail
app.put('/trash', (req, res) => {
  const email = req.body;
  console.log('email from', email.from)
  console.log(email);
  console.log('logged in emails', loggedInUser.emails);
  var answer = loggedInUser.emails.find(function (searchEmail) {
    return searchEmail.id === email.id})
  answer.isTrashed = !answer.isTrashed;
  answer.isImportant = !answer.isImportant;
  console.log(loggedInUser.emails);
  res.json({ msg: 'Item was updates!' });
})

// UPDATE - toggleTags
app.put('/toggleTags', (req, res) => {
  const email = req.body;
  console.log('email from', email.from)
  console.log(email);
  console.log('logged in emails', loggedInUser.emails);
  var answer = loggedInUser.emails.find(function (searchEmail) {
    return searchEmail.id === email.id})
  answer.isImportant = email.isImportant;
  answer.isTrashed = email.isTrashed;
  answer.isRead = email.isRead;
  console.log(loggedInUser.emails);
  res.json({ msg: 'Item was updates!' });
})


app.listen(3003, () => {
  console.log('REST API listening on port 3003!')
})

function findNextId() {
  var maxId = 0;
  items.forEach(item => {
    if (item.id > maxId) maxId = item.id;
  });
  return maxId + 1;
}



// READ
app.get('/item/:id', (req, res) => {
  const id = +req.params.id;
  const item = items.find(currItem => currItem.id === id);
  res.json(item)
})

// TODO: DELETE
app.delete('/item/:id', (req, res) => {
  const id = +req.params.id;
  items = items.filter(currItem => currItem.id !== id);
  res.json({ msg: 'Deleted' });
})