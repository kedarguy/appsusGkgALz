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
let system = {
  userEmail: 'system@noreply.com',
}
let puki = {
  userEmail: 'puki@puki.com',
  pass: 1234,
  emails: [{ id: 1, from: system.userEmail, subject: 'Puki, Welcome To GZMail', content: 'Welcome To GZMail, This is your very first email', isTrashed: false, isImportant: false, isRead: false, isSent: false }]
}

let shuki = {
  userEmail: 'shuki@shuki.com',
  pass: 1234,
  emails: [
    { id: 1, from: puki.userEmail, subject: 'Lemme Freak', content: 'What\'s the deal with your family? Got any siblings?" She like, \"I have a brother,\" I\'m like, \"Oh, what he do?"', isTrashed: false, isImportant: false, isRead: false, isSent: false },
    { id: 2, from: puki.userEmail, subject: 'Classic Male Pregame', content: 'While we on the topic, I been actually thinkin\' about some shit About the Army and Navy What if tomorrow is the day That the fucking aliens came', isTrashed: false, isImportant: false, isRead: false, isSent: false },
    { id: 3, from: puki.userEmail, subject: 'Save Dat Money', content: 'Like, would we even be able to fuck with their shit? Like, do we got the type of weaponry to fuck with their ships?', isTrashed: false, isImportant: false, isRead: false, isSent: false },
    { id: 4, from: puki.userEmail, subject: 'Professional Rapper', content: 'Or could we do some shit to be making they heart race? Granted I don\'t know the alien heart', isTrashed: false, isImportant: false, isRead: false, isSent: false },
  ]
}

let users = [puki, shuki];

let loggedInUser = null;

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
  const recieverUserEmailAddress = email.to.toLowerCase();
  console.log('recieverUserEmailAddress lower case');
  console.log(recieverUserEmailAddress);
  var recieverUser = getUserByEmail(recieverUserEmailAddress);
  if (recieverUser) {
    email.from = loggedInUser.userEmail;
    email.isTrashed = false;
    email.isImportant = false;
    email.isRead = false;
    email.isSent = true;
    email.id = loggedInUser.emails.length + 1;
    loggedInUser.emails.push(email);
    var recieverUser = getUserByEmail(recieverUserEmailAddress);
    var sentEmail = Object.assign({}, email);
    sentEmail.to = recieverUserEmailAddress;
    sentEmail.isSent = false;
    sentEmail.id = recieverUser.emails.length + 1;
    recieverUser.emails.push(sentEmail);
    res.json({ loggedInUser });
  } else {
    res.status(777).send('email doesnt exist!')
  }
})

// UPDATE - trashMail
app.put('/trash', (req, res) => {
  const email = req.body;
  console.log('email from', email.from)
  console.log(email);
  console.log('logged in emails', loggedInUser.emails);
  var answer = loggedInUser.emails.find(function (searchEmail) {
    return searchEmail.id === email.id
  })
  answer.isTrashed = !answer.isTrashed;
  answer.isImportant = !answer.isImportant;
  console.log(loggedInUser.emails);
  res.json({ msg: 'Item was updates!' });
})

// UPDATE - logIn
app.put('/logIn', (req, res) => {
  const userCred = req.body;
  console.log('logIn attempt from', userCred.emailAddress.toLowerCase(), 'password: ', userCred.pass);
  const tempUser = users.find(function (searchedUser) {
    return searchedUser.userEmail === userCred.emailAddress.toLowerCase() && searchedUser.pass === +userCred.pass
  })
  console.log(tempUser);
  if (tempUser) {
    loggedInUser = tempUser;
    res.json({ loggedInUser });
  } else {
    res.status(404).send('user does not exist... please create new account')

  }

})
// UPDATE - logOut
app.put('/logOut', (req, res) => {
  console.log('logOut attempt');
  loggedInUser = null;
    res.json({ loggedInUser });
  })

// UPDATE - newUser
app.put('/newUser', (req, res) => {
  const userCred = req.body;
  userCred.emailAddress = userCred.emailAddress.toLowerCase()
  console.log('New User attempt from', userCred.emailAddress, 'password: ', userCred.pass);
  const isEmailTaken = users.find(function (searchedUser) {
    return searchedUser.userEmail === userCred.emailAddress
  })
  console.log('****',users);
  console.log('****',isEmailTaken);
  if (isEmailTaken) {
    res.status(888).send('User already exists in our records')

  } else {
    const tempUser = {
        userEmail: userCred.emailAddress,
        pass: userCred.pass,
        emails: [{ id: 1, from: system.userEmail, subject: 'Welcome To GZMail', content: 'Welcome To GZMail, This is your very first email', isTrashed: false, isImportant: false, isRead: false, isSent: false }]
      };
    users.push(tempUser);
    console.log(users);
    loggedInUser = tempUser;
    res.json({ loggedInUser });
  }

})

// UPDATE - toggleTags
app.put('/toggleTags', (req, res) => {
  const filter = req.body;
  console.log('filter id', filter.id)
  console.log(filter);
  console.log('logged in emails', loggedInUser.emails);
  var answer = loggedInUser.emails.find(function (searchEmail) {
    return searchEmail.id === filter.id
  })
  console.log('answer email');
  console.log(answer);
  answer.isImportant = filter.isImportant;
  answer.isTrashed = filter.isTrashed;
  answer.isRead = filter.isRead;
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