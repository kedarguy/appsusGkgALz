<template>
  <div class="email-list">
    <div class="compose">
      <button class="compose-email" @click="composeEmail()">Compose New Email </button>
    </div>
    <ul>
      <li v-for="(currEmail,idx) in emails" @click="selectEmail(currEmail,idx)" :key="idx">
        <div class="single-email" :class="{'selectedClass': idx === selectedEmail}">
          <img src="../../materials/Faumail/photoIcon.png">
          <div class="content-cont">
            <div class="subject">
              {{currEmail.subject}}
            </div>
            <div class="from">
              {{currEmail.from}}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
// v-bind:class="{selectedClass:selectedEmail}"
import EmailService from '../api/email.services'

export default {
  name: 'email-list',
  props: ['emails'],
  data() {
    return {
      selectedEmail: null,
    }
  },
  created() {
    this.selectedEmail = 0; //first email choose
  },
  methods: {
    selectEmail(email, idx) {
      this.selectedEmail = idx;
      console.log('emiting email', this.selectedEmail)
      this.$emit('updatePreviewEmail', email);
    },
    composeEmail() {
      console.log('emiting start Compose')
      this.$emit('composeEmail');
    },
    // toggleActive() {
    //   this.isActive = !this.isActive;
    // }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped >
@import url('https://fonts.googleapis.com/css?family=Montserrat');
.email {
  background-color: lightgreen;
  border: 2px solid black;
}

.email-list {
  background-color: white;
  width: 100%;
  border: 1px solid black;
  font-family: 'Montserrat', sans-serif;
}

li {
  list-style: none;
  margin: 10px 5px;
}

ul {
  margin: 0;
  padding: 0;
}

.single-email {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 7px;

  img {
    max-height: 60px;
    margin: 5px 20px 5px 5px;
  }
}

.compose {
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    background-color: #4cd964;
    padding: 20px;
    width: 100%;
    border-radius: 5px;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
  }
}

.subject {
  font-weight: bold;
  font-size: 20px;
  padding: 4px;
}

.from {
  overflow: hidden;
}

.active {
  background-color: #ff2d55;
}

.selectedClass {
  box-sizing: border-box;
  outline: 1px solid black;
  background-color: cornflowerblue
}
</style>
