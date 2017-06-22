var users = [puki, shuki];

var puki = {
    userEmail: 'puki@puki.com',
    emails: []
}

var shuki= {
    userEmail: 'shuki@shuki.com',
    emails: [
        {from: '1', subject: 'fesavs', content: 'dsvasv'},
        {from: '2', subject: '2', content: '2'},
        {from: '3', subject: '3', content: '3'},
        {from: '4', subject: '4', content: '4'},
    ]
}

function getCurrUser() {
    return shuki
}

function getEmails(user) {
    return user.emails
}

//on server we wont nees user input, will do according to to/from
function sendEmail(email) {
    console.log(email);
    email.from = getCurrUser();
    email.from.emails.push(email);
    console.log('email From: ');
    console.log(email.from);
}

function getUserByEmail(user) {
    debugger
    return users.find(currUser => currUser.userEmail === user.userEmail)
}

export default {
  getEmails,
  getCurrUser,
  sendEmail
}