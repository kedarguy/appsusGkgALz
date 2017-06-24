<template>
  <div class="email-preview">
    <div v-if="email">
      <h1>subject: {{email.subject}}</h1>
      <h2>from: {{email.from}}</h2>
      <h3>content: {{email.content}}</h3>
      <button @click="replyEmail()">Reply</button>
      <button @click="toggleTags('read')" v-model="markRead">{{markRead}}</button>
      <button @click="toggleTags('trash')" v-model="trashEmail">{{trashEmail}}</button>
      <button @click="toggleTags('important')" v-model="markImportant">{{markImportant}}</button>
    </div>
  </div>
</template>



<script>
import EmailService from '../api/email.services'

export default {
  name: 'email-preview',
  props: ['email'],
  watch: {
    email: function () {
      if (this.email) {
        !this.email.isImportant ? this.markImportant = "Mark as important" : this.markImportant = "Mark as Unimportant";
        !this.email.isTrashed ? this.trashEmail = "Trash this mail" : this.trashEmail = "move to inbox";
        !this.email.isRead ? this.markRead = "Mark as read" : this.markRead = "Mark as Unread";
      }
    }
  },
  data() {
    return {
      markRead: 'Mark as read',
      trashEmail: "Trash this mail",
      markImportant: "Mark as important"
    }
  },
  methods: {
    trashEmail() {
      this.$emit('replyEmail', this.email);
      console.log(this.email)
      EmailService.trashEmail(this.email);
    },
    replyEmail() {
      console.log('reply');
      this.$emit('replyEmail', this.email);
    },
    toggleTags(tag) {
      console.log('before', this.email);
      switch (tag) {
        case 'important': {
          this.email.isImportant ? this.markImportant = "Mark as important" : this.markImportant = "Mark as Unimportant"
          this.email.isImportant = !this.email.isImportant;
          break;
        }
        case 'trash': {
          this.email.isTrashed ? this.trashEmail = "Trash this mail" : this.trashEmail = "move to inbox"
          this.email.isTrashed = !this.email.isTrashed;
          break;
        }
        case 'read': {
          this.email.isRead ? this.markRead = "Mark as read" : this.markRead = "Mark as Unread"
          this.email.isRead = !this.email.isRead;
          break;
        }
      }
      console.log('email over', this.email);
      EmailService.toggleTags(this.email);
      this.$emit('toggleTags', this.email);
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.email-preview {
  background-color: lightgrey;
  border: 2px solid black;
  width: 70vw;
}
</style>
