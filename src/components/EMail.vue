<template>
  <div class="email">
    <h1>Hello Email</h1>
    <email-nav> </email-nav>
    <div class="main">
      <email-list> </email-list>
      <email-preview> </email-preview>
    </div>
  </div>
</template>

<script>
import EmailNav from '@/components/EmailNav'
import EmailList from '@/components/EmailList'
import EmailPreview from '@/components/EmailPreview'

export default {
  name: 'email-comp',
  components: {
    EmailNav,
    EmailList,
    EmailPreview
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.email {
  background-color: purple;
}
</style>
