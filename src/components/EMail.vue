<template>
  <div class="email">
    <section class="log-in" v-if="!currUser">
      <div class="log-in-cont">
        <div class="input-div">
          <img src="../../materials/Faumail/login-user.png">
          <input type="text" placeholder="email" v-model="inputEmailAddress">
        </div>
        <div class="input-div">
          <img src="../../materials/Faumail/login-pass.png">
          <input type="text" placeholder="password" v-model="inputPassword">
        </div>
        <button @click="logIn()" class="log-in-button"> log-in </button>
        <div class="new-account">
          No account yet? <button @click="createNewUser()"> create a new Account </button>
        </div>
      </div>
    </section>
    <section class="log-out" v-if="currUser">
      <button @click="logOut()"> Log-Out </button>
    </section>
    <section class="after-log-in" v-if="currUser">
      <email-nav @filterTags="applyNewEmailsFilter">
      </email-nav>
      <div class="main">
        <email-list @updatePreviewEmail="updatePreviewEmail" :emails="filteredEmails" @composeEmail="composeNewEmail"> </email-list>
        <section>
          <email-preview v-if="!isComposeNewMode" :email="currPrevEmail" @toggleTags="emailToggleTags" @replyEmail="replyEmail"> </email-preview>
          <email-compose v-if="isComposeMode" :emails="filteredEmails" :addressToSend="emailTo" @sendNewEmail="sendEmail" @discardEmail="discardEmail"> </email-compose>
        </section>
      </div>
    </section>
  </div>
</template>


<script>


import EmailNav from '@/components/EmailNav'
import EmailList from '@/components/EmailList'
import EmailPreview from '@/components/EmailPreview'
import EmailCompose from '@/components/EmailCompose'
import EmailService from '../api/email.services'

export default {
  name: 'email-comp',

  // TODO: look for better solution for changes in list
  //   watch: {
  //   emails: function () {
  //     let tempThis = this;
  //     EmailService.getCurrUser().then(function (servCurrUser) {
  //       tempThis.currUser = servCurrUser;
  //       tempThis.emails = tempThis.currUser.emails;
  //     })
  //   }
  // },
  data() {
    return {
      emails: null,
      currUser: null,
      currPrevEmail: null,
      isComposeMode: false,
      isComposeNewMode: false,
      tagToFilter: 'Unread',
      composeNewMail: {
        to: null,
        subject: null,
        content: null,
      },
      emailTo: null,
      // filteredEmails: {},
      inputEmailAddress: 'shuki@shuki.com',  //change to null
      inputPassword: 1234, //change to null
    }
  },
  computed: {
    filteredEmails() {
      this.currUser;
      this.isComposeMode;
      return EmailService.emailsFilter(this.currUser, this.tagToFilter);
    }
  },


  methods: {
    updatePreviewEmail(email) {
      this.currPrevEmail = email;
    },
    toggleComposeMode() {
      this.isComposeMode = !this.isComposeMode;
      this.isComposeNewMode = !this.isComposeNewMode;
    },
    emailToggleTags(updatedEmailProps) {
      this.currPrevEmail.isImportant = updatedEmailProps.isImportant;
      this.currPrevEmail.isRead = updatedEmailProps.isRead;
      this.currPrevEmail.isTrashed = updatedEmailProps.isTrashed;
    },
    applyNewEmailsFilter(tag) {
      this.tagToFilter = tag;
      console.log(this.tagToFilter);
    },
    composeNewEmail() {
      this.emailTo = null;
      this.isComposeNewMode = true;
      this.isComposeMode = true;
    },
    sendEmail(updatedUser) {
      console.log('update user recieved at email comp');
      console.log(updatedUser);
      this.toggleComposeMode();
      this.currUser = updatedUser;
      // this.emails = this.currUser.emails
      // this.filteredEmails = this.emails
    },
    discardEmail() {
      console.log('wee discard');
      this.toggleComposeMode();
    },
    replyEmail(emailAddress) {
      this.emailTo = emailAddress.from;
      this.toggleComposeMode();
    },
    // updateCurrUserAndEmails() {
    //   let tempThis = this;
    //   EmailService.getCurrUser().then(function (servCurrUser) {
    //     if (servCurrUser) {
    //       tempThis.currUser = servCurrUser;
    //       tempThis.filteredEmails = tempThis.currUser.emails;
    //       tempThis.currPrevEmail = tempThis.filteredEmails[0];
    //     } else {
    //       tempThis.currUser
    //     }
    //   })
    // },
    logIn(inputEmailAddress, inputPassword ) {
      console.log('login started');
      let tempThis = this;
      EmailService.logInAttempt(inputEmailAddress, inputPassword)
        .then(function (tempUser) {
          tempThis.currUser = tempUser;
          tempThis.currPrevEmail = tempThis.filteredEmails[0]

        })
    },
    logOut() {
      console.log('log out started');
      let tempThis = this;
      EmailService.logOutAttempt()
        .then(function (tempUser) {
          tempThis.currUser = null;
        })
    },
    createNewUser() {
      console.log('createNewUser started');
      let tempThis = this;
      EmailService.CreateNewUserAttempt(this.inputEmailAddress, this.inputPassword)
        .then(function (tempUser) {
          tempThis.currUser = tempUser;
        }
        )
    }
  },
  components: {
    EmailNav,
    EmailList,
    EmailCompose,
    EmailPreview
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');

.email {
  background-color: purple;
}

.main {
  display: flex;
  flex-direction: row;
}

.log-in {
  background-color: #5856d6;
  min-height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column; 
  background-image: url(../../materials/Faumail/background_with_logo.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  .log-in-cont {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 30vw;
    margin-bottom: 10vh;
  }
  input {
    background: transparent;
    border: none;
    max-width: 80%;
    padding: 10px 5px;
    font-family: 'Montserrat', sans-serif;
    color: #ffffff;
    font-size: 20px;
    &:hover {
      cursor: text;
    }
  }

  .input-div {
    border-bottom: 2px solid #7e7de2;
    margin: 10px 0;
    width: 100%;
    img {
      max-height: 20px;
      max-width: 20%;
    }
  }


  .log-in-button {
    background-color: #ffffff;
    color: #5856d6;
    border: none;
    border-radius: 15px;
    padding: 10px 50px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 20px;
    width: 100%;
    margin: 10px 0;

    &:hover {
      cursor: pointer;
    }
  }

  .new-account {
    width: 100%;
    font-family: 'Montserrat', sans-serif;
    
    font-size: 14px;
    button {
      border: none;
      background: transparent;
      color: #5ac8fa;
      font-size: 14px;
      font-weight: bold;
        &:hover {
      cursor: pointer;
    }
    }
  }
}
</style>
