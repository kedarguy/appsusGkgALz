<template>
  <section class="log-in">
    <div class="log-in-cont">
      <div class="input-div">
        <img src="../../materials/Faumail/login-user.png">
        <input type="text" placeholder="email" v-model="inputEmailAddress">
      </div>
      <div class="input-div">
        <img src="../../materials/Faumail/login-pass.png">
        <input type="text" placeholder="password" v-model="inputPassword">
      </div>
      <button @click="logIn()" class="log-in-button"> log-in </button>
      <div class="new-account">
        No account yet?
        <button @click="createNewUser()"> create a new Account </button>
      </div>
    </div>
  </section>
</template>


<script>

export default {
  name: 'email-login',

  data() {
    return {
      inputEmailAddress: 'shuki@shuki.com',  //change to null
      inputPassword: 1234, //change to null
    }
  },
  methods: {
    logIn() {
      this.$emit('loginInit', this.inputEmailAddress, this.inputPassword);
    },
    createNewUser() {
      this.$emit('createUserInit', this.inputEmailAddress, this.inputPassword);
    }

  }
}

</script>

<style  lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');

.log-in {
  background-color: #5856d6;
  min-height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  background-image: url(../../materials/Faumail/background_with_logo.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  .log-in-cont {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 30vw;
    margin-bottom: 10vh;
  }
  input {
    background: transparent;
    border: none;
    max-width: 80%;
    padding: 10px 5px;
    font-family: 'Montserrat', sans-serif;
    color: #ffffff;
    font-size: 20px;
    &:hover {
      cursor: text;
    }
  }

  .input-div {
    border-bottom: 2px solid #7e7de2;
    margin: 10px 0;
    width: 100%;
    img {
      max-height: 20px;
      max-width: 20%;
    }
  }


  .log-in-button {
    background-color: #ffffff;
    color: #5856d6;
    border: none;
    border-radius: 15px;
    padding: 10px 50px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 20px;
    width: 100%;
    margin: 10px 0;

    &:hover {
      cursor: pointer;
    }
  }

  .new-account {
    width: 100%;
    font-family: 'Montserrat', sans-serif;

    font-size: 14px;
    button {
      border: none;
      background: transparent;
      color: #5ac8fa;
      font-size: 14px;
      font-weight: bold;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
