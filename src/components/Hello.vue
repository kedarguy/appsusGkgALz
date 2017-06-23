<template>
  <div class="hello">
    <h1>Welcome to Gk-gALz app</h1>
        <router-link to="email">
          <div >Email</div>
        </router-link>
        <router-link to="places">
          <div >Places</div>
        </router-link>
        <router-link to="book-store">
          <div >Book Store</div>
        </router-link>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
