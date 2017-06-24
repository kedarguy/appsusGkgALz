<template>
  <div class="email">
    <section class="log-in" v-if="!currUser">
      <input type="text" placeholder="email" v-model="inputEmailAddress">
      <input type="text" placeholder="password" v-model="inputPassword">
  
      <button @click="logIn()"> log-in </button>
      <button @click="createNewUser()"> create new user </button>
    </section>
    <section class="after-log-in" v-if="currUser">
      <email-nav @filterTags="emailsFilter">
      </email-nav>
      <div class="main">
        <email-list @updatePreviewEmail="updatePreviewEmail" :emails="filteredEmails" @composeEmail="composeNewEmail"> </email-list>
        <section>
          <email-preview v-if="!isComposeNewMode" :email="currPrevEmail" @toggleTags="emailToggleTags" @replyEmail="replyEmail"> </email-preview>
          <email-compose v-if="isComposeMode" :addressToSend="emailTo" @sendNewEmail="sendEmail"> </email-compose>
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
  created() {

  },
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
      tagToFilter: 'Default',
      emailTo: null,
      filteredEmails: {},
      inputEmailAddress: null,
      inputPassword: null,
    }
  },
  methods: {
    updatePreviewEmail(email) {
      this.currPrevEmail = email;
    },
    emailToggleTags(email) {
      this.currPrevEmail.isImportant = email.isImportant;
      this.currPrevEmail.isRead = email.isRead;
      this.currPrevEmail.isTrashed = email.isTrashed;
    },
    composeNewEmail() {
      this.emailTo = null;
      this.isComposeNewMode = true;
      this.isComposeMode = true;
    },
    sendEmail() {
      this.isComposeMode = !this.isComposeMode;
      this.isComposeNewMode = !this.isComposeNewMode;
      this.updateCurrUserAndEmails();
    },
    replyEmail(emailAddress) {
      this.emailTo = emailAddress.from;
      this.isComposeMode = !this.isComposeMode;
      this.isComposeNewMode = !this.isComposeNewMode;
    },
    emailsFilter(tag) {
      console.log('top comp', tag);
      this.tagToFilter = tag;
      if (tag === 'Unread') this.filteredEmails = this.emails.filter(function (email) { return email.isRead === false });
      else this.filteredEmails = this.emails.filter(function (email) { return email[tag] === true });
      this.currPrevEmail = this.filteredEmails[0];
    },
    updateCurrUserAndEmails() {
          let tempThis = this;
          EmailService.getCurrUser().then(function (servCurrUser) {
            if (servCurrUser) {
              tempThis.currUser = servCurrUser;
              tempThis.emails = tempThis.currUser.emails;
              tempThis.filteredEmails = tempThis.emails;
              tempThis.currPrevEmail = tempThis.filteredEmails[0];
            } else {
              tempThis.currUser
            }
          })
    },
    logIn() {

      console.log('login started');

      let tempThis = this;
      EmailService.logInAttempt(this.inputEmailAddress, this.inputPassword)
        .then(function (tempUser) {
          tempThis.updateCurrUserAndEmails();
        })
    },
    createNewUser() {
      console.log('createNewUser started');
      EmailService.CreateNewUserAttempt(this.inputEmailAddress, this.inputPassword)
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
<style scoped>
.email {
  background-color: purple;
}

.main {
  display: flex;
  flex-direction: row;
}
</style>
