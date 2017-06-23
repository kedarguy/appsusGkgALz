<template>
  <li @click.native="selectEmail(email)">
    subject: {{email.subject}}
  </li>
</template>

<script>

export default {
  name: 'email-li',
  props: ['email'],
  methods: {
    selectEmail(email) {
      this.selectedBook = book;
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.email {
  background-color: white;
  border: 2px solid black;
}
</style>
