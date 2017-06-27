<template>
  <div class="email">
    <email-login v-if="!currUser" @loginInit="logIn" @createUserInit="createUser"></email-login>
    <section class="after-log-in" v-if="currUser">
      <div class="main">
        <email-nav class="email-nav" @filterTags="applyNewEmailsFilter" @logOutInit="logOut" :allInbox="allInbox" :unreadEmails="unreadEmails" :readEmails="readEmails" :importantEmails="importantEmails" :trashedEmails="trashedEmails" :sentEmails="sentEmails">
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
      currUser: null,
      currPrevEmail: null,
      isComposeMode: false,
      isComposeNewMode: false,
      tagToFilter: 'All',
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
      if (this.currUser) {
        var filtered = EmailService.emailsFilter(this.currUser, this.tagToFilter);
        return filtered;
      } else {
        return [];
      }
    },
    allInbox() {
      let filtEmail = EmailService.emailsFilter(this.currUser, 'All');
      return filtEmail.length;
    },
    unreadEmails() {
      let filtEmail = EmailService.emailsFilter(this.currUser, 'Unread');
      return filtEmail.length;
    },
    readEmails() {
      let filtEmail = EmailService.emailsFilter(this.currUser, 'isRead');
      return filtEmail.length;
    },
    importantEmails() {
      let filtEmail = EmailService.emailsFilter(this.currUser, 'isImportant');
      return filtEmail.length;
    },
    trashedEmails() {
      let filtEmail = EmailService.emailsFilter(this.currUser, 'isTrashed');
      return filtEmail.length;
    },
    sentEmails() {
      let filtEmail = EmailService.emailsFilter(this.currUser, 'isSent');
      return filtEmail.length;
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
      this.currPrevEmail = this.filteredEmails[0];
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
      if (updatedUser) this.currUser = updatedUser;
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
      this.tagToFilter = 'All';
      EmailService.logInAttempt(inputEmailAddress, inputPassword)
        .then(function (tempUser) {
          console.log('tempThis.currUser before login');
          console.log(tempThis.currUser);
          console.log(tempThis.filteredEmails);
          tempThis.currUser = tempUser;
          console.log('tempThis.currUser after login');
          console.log(tempThis.currUser);
          console.log('tempThis.filteredEmails after login');
          console.log(tempThis.filteredEmails);
          tempThis.currPrevEmail = tempThis.filteredEmails[0]
        })
    },
    logOut() {
      let tempThis = this;
      this.currPrevEmail = null;
      this.currUser = null;
      EmailService.logOutAttempt()
        .then(function (tempUser) {
          tempThis.currUser = null;
          tempThis.filteredEmails = null;
          console.log('tempThis.currUser after logout');
          console.log(tempThis.currUser);
        })
    },
    createUser(inputEmailAddress, inputPassword) {
      let tempThis = this;
      EmailService.CreateNewUserAttempt(inputEmailAddress, inputPassword)
        .then(function (tempUser) {
          tempThis.currUser = tempUser;
        })
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
