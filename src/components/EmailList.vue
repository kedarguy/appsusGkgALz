<template>
  <div class="email-list">
    <button class="compose-email" @click="composeEmail()">Compose </button>
    <ul>
      <li v-for="currEmail in emails" 
          @click="selectEmail(currEmail)">
        subject: {{currEmail.subject}}
      </li>
    </ul>
  </div>
</template>

<script>
import EmailService from '../api/email.services'

export default {
  name: 'email-list',
  created() {
    this.currUser = EmailService.getCurrUser();
    this.emails = EmailService.getEmails(this.currUser);
  },
  data() {
    return {
      emails: null,
      currUser: null
    }
  },
  methods: {

    selectEmail(email) {
      console.log('emiting email')
     this.$emit('updatePreviewEmail', email);
    },
    composeEmail() {
      console.log('emiting start Compose')
      this.$emit('composeEmail');
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.email {
  background-color: lightgreen;
  border: 2px solid black;
}

.email-list {
  background-color: gray;
  width: 35%;
}
</style>
