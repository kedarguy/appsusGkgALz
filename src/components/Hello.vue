<template>
  <div class="hello">
    <h1>Welcome to Gk-gALz app</h1>
        <router-link to="email">
          <div class="email-class">Email</div>
        </router-link>
        <router-link to="places">
          <div class="place-class">Places</div>
        </router-link>
        <router-link to="book-store">
          <div class="book-class" >Book Store</div>
        </router-link>
        <img class="logo-img" src="../assets/logo.png" alt="logo">
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
.hello {
    border: 5px solid black;
    height: 80vh;
    text-align: center;
}
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
.email-class, .place-class, .book-class {
  display: inline;
   -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  cursor: pointer;
  padding: 9px 20px;
  overflow: hidden;
  border: 1px solid;
  font: normal 19px/1 "Acme", Helvetica, sans-serif;
  color: rgba(0,0,0,1);
  text-align: center;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  background: #ffffff;
  -webkit-box-shadow: 3px 3px 0 0 rgba(0,0,0,0.8) ;
  box-shadow: 3px 3px 0 0 rgba(0,0,0,0.8) ;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.2) ;
}
a {
  color: #42b983;
}
.logo-img {
  display: block;
  margin: auto;
  margin-top: 10vw;
}
</style>
