<template>
  <div class="email-list">
    <div class="compose">
      <button class="compose-email" @click="composeEmail()">Compose New Email </button>
    </div>
    <ul>
      <li v-for="currEmail in emails" @click="selectEmail(currEmail)"
                                                                  
      >
        <div class="single-email" 
        
        >
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
</template>

<script>
import EmailService from '../api/email.services'

export default {
  name: 'email-list',
  props: ['emails'],
  data() {
    return {
      currUser: null,

    }
  },
  methods: {
    selectEmail(email) {
      console.log('emiting email')
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
  width: 25vw;
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
  justify-content: space-between;
  align-items: center;
  margin: 40px;

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
  overflow:  hidden;
}

.active {
  background-color: #ff2d55;
}
</style>
