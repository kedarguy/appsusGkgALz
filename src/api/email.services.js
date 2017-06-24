
const urlUsers = 'http://localhost:3003/users';
const urlCurrUser = 'http://localhost:3003/currUser';
const urlNewEmail = 'http://localhost:3003/newEmail';
const urlTrashEmail = 'http://localhost:3003/trash';
const urlLogIn = 'http://localhost:3003/logIn';
const urltoggleTags = 'http://localhost:3003/toggleTags';

import axios from 'axios'

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

function logInAttempt(emailAddress, pass) {
    console.log(`email address: ${emailAddress}, password: ${pass}`);
    const userCred = { emailAddress, pass };
    return axios.put(urlLogIn, userCred)
        .then(function (response) {
            return response.data.loggedInUser
        })
        .catch(function (error) {
            console.log(error);
        });
}
function CreateNewUserAttempt(emailAdress, pass) {
    console.log(`creating new user, email address: ${emailAdress}, password: ${pass}`);
    // axios.put(urlTrashEmail, email)
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
}

function trashEmail(email) {
    console.log("trashing email", email);
    axios.put(urlTrashEmail, email)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function toggleTags(filter, updateField) {
    console.log("marking filter", filter);
    axios.put(urltoggleTags, filter)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}



function replyEmail(email) {
    console.log("reply email");
}

//curruntly supporting only one address to send to
function sendEmail(email) {
    console.log(email);
    // return $.post(urlNewEmail, 'test')
    //     .then(msg => console.log(msg));
    axios.post(urlNewEmail, email)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}


export default {
    getEmails,
    getCurrUser,
    sendEmail,
    trashEmail,
    replyEmail,
    toggleTags,
    logInAttempt,
    CreateNewUserAttempt

}