<template>
  <div class="email-preview">
    <div v-if="email">
      <h1>subject: {{email.subject}}</h1>
      <h2>from: {{email.from}}</h2>
      <h3>content: {{email.content}}</h3>
      <button @click="replyEmail()">Reply</button>
      <button @click="trashEmail()">Trash email</button>
    </div>
  </div>
</template>



<script>
import EmailService from '../api/email.services'

export default {
  name: 'email-preview',
  props: ['email'],
  methods: {
    trashEmail() {
      EmailService.trashEmail(this.email);
    },
    replyEmail() {
      EmailService.replyEmail(this.email);
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.email-preview {
  background-color: lightgrey;
  border: 2px solid black;
  width: 65%;
}
</style>
