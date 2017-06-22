const urlUsers = 'http://localhost:3003/users';
const urlCurrUser = 'http://localhost:3003/currUser';

// var puki = {
//     userEmail: 'puki@puki.com',
//     emails: [ ]
// }

// var shuki= {
//     userEmail: 'shuki@shuki.com',
//     emails: [
//         {from: puki.userEmail, subject: 'fesavs', content: 'dsvasv'},
//         {from: puki.userEmail, subject: '2', content: '2'},
//         {from: puki.userEmail, subject: '3', content: '3'},
//         {from: puki.userEmail, subject: '4', content: '4'},
//     ]
// }

// var users = [puki, shuki];

// var gPrmCurrUser = getCurrUser();

// function getUsers() {
//   // Simple Caching, if we already got them, just return
//   if (prmUsers) {
//     console.log('Getting Products from Cache');
//     return Promise.resolve(prmUsers);
//   }
//   console.log('Getting Products from Server');
//   var prmUsers = fetch(urlUsers);

//   return prmUsers
//     .then(res => res.json())
//     .then(usrs => {
//       prmUsers = usrs;
//       return prmUsers;
//     });

// }

function getCurrUser() {
    var prmCurrUser = fetch(urlCurrUser);

    return prmCurrUser.then(res => res.json())
    
}

function getEmails(user) {
    return user.emails
}

//curruntly supporting only one address to send to
function sendEmail(email) {
    console.log(email);
    var currUser = getCurrUser();
    email.from = currUser.userEmail;
    currUser.emails.push(email);
    var recieverUser = getUserByEmail(email.to);
    recieverUser.emails.push(email);
    console.log('email to: ');
    console.log(recieverUser);
}

function getUserByEmail(emailAddress) {
    return prmUsers.find(currUser => currUser.userEmail === emailAddress)
}

export default {
    getEmails,
    getCurrUser,
    sendEmail
}