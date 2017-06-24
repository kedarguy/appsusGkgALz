<template>
  <div class="email-compose">
    <form>
      <input type="text" v-model="emailToEdit.to" placeholder="to" :disabled="addressToSend">
      <input type="text" v-model="emailToEdit.subject" placeholder="subject">
      <el-input type="textarea" :rows="10" v-model="emailToEdit.content" placeholder="content"></el-input>
      <button @click="sendEmail()">Send</button>
      <button @click="discardEmail()">Discard</button>
    </form>
  </div>
</template>

<script>
import EmailService from '../api/email.services'
import { bus } from '../main';


export default {
  name: 'email-compose',
  props: ['addressToSend'],
  created() {
    if (this.addressToSend) {
      this.emailToEdit.to = this.addressToSend;
    } else this.emailToEdit.to = null;
    // bus.$on('replayEmail', (email) => {this.emailToEdit.to = email.from})
  },
  watch: {
    addressToSend: function () {
      if (this.addressToSend) {
        this.emailToEdit.to = this.addressToSend;
      } else this.emailToEdit.to = null;
    }
  },
  data() {
    return {
      emailToEdit: {
        to: null,
        subject: null,
        content: null,
      }
    }
  },
  methods: {
    composeNewEmail() {
      console.log('blahblah new email');
    },
    sendEmail() {
      EmailService.sendEmail(this.emailToEdit);
      this.$emit('toggleComposeMode');
    },
    discardEmail() {
      this.$emit('toggleComposeMode');
    }
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.email-preview {
  background-color: lightgrey;
  border: 2px solid black;
}

input {
  display: block;
  width: 70vw;
}
</style>
