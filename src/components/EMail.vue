<template>
  <div class="email">
    <email-login v-if="!currUser" @loginInit="logIn" @createUserInit="createUser"></email-login>
    <section class="after-log-in" v-if="currUser">
      <div class="main">
      <email-nav class="email-nav" @filterTags="applyNewEmailsFilter" @logOutInit="logOut" :emails="filteredEmails">
      </email-nav>
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
import EmailLogin from '@/components/EmailLogin'
import EmailService from '../api/email.services'

export default {
  name: 'email-comp',
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
      this.toggleComposeMode();
      this.currUser = updatedUser;
    },
    discardEmail() {
      this.toggleComposeMode();
    },
    replyEmail(emailAddress) {
      this.emailTo = emailAddress.from;
      this.toggleComposeMode();
    },
    logIn(inputEmailAddress, inputPassword) {
      let tempThis = this;
      EmailService.logInAttempt(inputEmailAddress, inputPassword)
        .then(function (tempUser) {
          tempThis.currUser = tempUser;
          tempThis.currPrevEmail = tempThis.filteredEmails[0]

        })
    },
    logOut() {
      let tempThis = this;
      this.currPrevEmail = null;
      EmailService.logOutAttempt()
        .then(function (tempUser) {
          tempThis.currUser = null;
        })
    },
    createUser(inputEmailAddress, inputPassword) {
      let tempThis = this;
      EmailService.CreateNewUserAttempt(inputEmailAddress, inputPassword)
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
    EmailPreview,
    EmailLogin
  }
}
</script>

<style  lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');

.email {
  background-color: #ffffff;
}

.main {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: #ffffff;
}

.email-nav {
  max-width: 15vw;
}
</style>
