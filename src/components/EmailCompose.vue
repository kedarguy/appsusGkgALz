<template>
  <div class="email-compose">
    <form>
      <div class="header">
        <label>To:
          <input type="text" v-model="emailToEdit.to" :disabled="addressToSend">
        </label>
        <label>Subject:
          <input type="text" v-model="emailToEdit.subject">
        </label>
  
      </div>
      <el-input type="textarea" :rows="10" v-model="emailToEdit.content" placeholder="content"></el-input>
      <button class="send-button" @click="sendEmail()">Send</button>
      <button class="delete-button" @click="discardEmail()">
        <img src="../../materials/Faumail/trash.png">
      </button>
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
      } else {
        this.emailToEdit.to = null;
        this.emailToEdit.subject = null;
        this.emailToEdit.content = null;
      }
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
    sendEmail() {
      const tempThis = this;
      EmailService.sendEmail(this.emailToEdit)
        .then(function (updatedUser) {
          tempThis.$emit('sendNewEmail', updatedUser)

        }
        )
    },
    discardEmail() {
      this.$emit('discardEmail');
    }
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');
label {
  display: block;
  width: 60vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  &:hover {
    cursor: pointer;
  }
}

.header {
  background-color: #5856d6;
  text-align: center;
  padding: 40px 20px;
  color: white;
  input {
    width: 80%;
    padding: 10px 5px;
    margin: 5px;
    font-family: 'Montserrat', sans-serif;
    background: transparent;
    color: white;
  }
}

button {
  width: 45%;
  padding: 20px 50px;
  font-family: 'Montserrat', sans-serif;
  color: black;
  font-weight: bold;
  img {
    width: 20px;
  }
}

.send-button {}
</style>
