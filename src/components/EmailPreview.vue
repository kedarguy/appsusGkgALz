<template>
  <div class="email-preview">
    <h1>Hello Email Preview</h1>
    <div>{{email}}</div>
  </div>
</template>

<script>

export default { 
  name: 'email-preview',
  props: ['email']
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
