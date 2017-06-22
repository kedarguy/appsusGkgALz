<template>
  <div class="email">
    <h1>Hello Email</h1>
    <email-nav> </email-nav>
    <div class="main">
      <email-list @updatePreviewEmail="updatePreviewEmail"
                  @composeEmail="composeNewEmail"
      > </email-list>
      <email-preview v-if="!isComposeMode" :email="currPrevEmail"> </email-preview>
      <email-compose v-if="isComposeMode" 
                      @closeComposeMode="disableComposeMode"
      > </email-compose>
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
    }
  },
  methods: {
    updatePreviewEmail(email) {
      this.currPrevEmail = email;
    },
    composeNewEmail() {
      this.isComposeMode = true;
    },
    disableComposeMode() {
      this.isComposeMode = false;
    },
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
