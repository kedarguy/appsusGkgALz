<template>
  <div class="email">
    <h1>Hello Email</h1>
    <email-nav> </email-nav>
    <div class="main">
      <email-list @updatePreviewEmail="updatePreviewEmail"
                  @composeEmail="composeNewEmail"
      > </email-list>
      <section>
        <email-preview v-if="!isComposeNewMode" :email="currPrevEmail"
                        @replyEmail="replyEmail"
        > </email-preview>
        <email-compose v-if="isComposeMode" :addressToSend="emailTo"
                        @toggleComposeMode="toggleComposeMode"
        > </email-compose>
      </section>
    </div>
  </div>
</template>


<script>
import EmailNav from '@/components/EmailNav'
import EmailList from '@/components/EmailList'
import EmailPreview from '@/components/EmailPreview'
import EmailCompose from '@/components/EmailCompose'

export default {
  name: 'email-comp',
  data() {
    return {
      currPrevEmail: null,
      isComposeMode: false,
      isComposeNewMode: false,
      emailTo: null,
    }
  },
  methods: {
    updatePreviewEmail(email) {
      this.currPrevEmail = email;
    },
    composeNewEmail() {
      this.emailTo = null;
      this.isComposeNewMode = true;
      this.isComposeMode = true;
    },
    toggleComposeMode() {
      this.isComposeMode = !this.isComposeMode;
      this.isComposeNewMode = !this.isComposeNewMode;
    },
    replyEmail(emailAddress) {
      this.emailTo = emailAddress.from;
      this.isComposeMode = !this.isComposeMode;
      this.isComposeNewMode = !this.isComposeNewMode;
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
