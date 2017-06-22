<template>
  <div class="email-compose">
    <form>
      <input type="text" v-model="emailToEdit.to" placeholder="to" required>
      <input type="text" v-model="emailToEdit.subject" placeholder="subject">
      <el-input type="textarea" :rows="10" v-model="emailToEdit.content" placeholder="content"></el-input>
      <button @click="sendEmail()">Send</button>
      <button @click="discardEmail()">Discard</button>
    </form>
  </div>
</template>

<script>
import EmailService from '../api/email.services'

export default {
  name: 'email-compose',
  data() {
    return {
      emailToEdit: {
        to: null,
        subject: null,
        content: null
      }
    }
  },
  methods: {
    composeNewEmail() {
      console.log('blahblah new email');
    },
    sendEmail() {
      EmailService.sendEmail(this.emailToEdit);
      this.$emit('closeComposeMode');
    },
    closeComposeModeEmail() {
      this.$emit('closeComposeMode');
    }
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.email-preview {
  background-color: lightgrey;
  border: 2px solid black;
  width: 65%;
}

input {
  display: block;
}
</style>
