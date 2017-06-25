<template>
  <div class="place-list">
    <section class="marked-places-list"> Marked Places:
      <button @click="toggleUpdateName()">Edit Mode</button>
      <li v-if="markers.length > 0" :key="idx" v-for="(marker, idx) in markers">
        <div class="location-name">
          {{marker.name}}
          <label v-if="isActive"> Location Name:
            <input type="text" v-model="marker.name">
          </label>
        </div>
        <div> location:
          <input type="text" v-model="marker.title" disabled>
          <button @click="removeMarker(marker)" v-if="isActive">
            <img src="../../materials/Faumail/delcontact.png"> </button>
        </div>
        <div> Tags:
          <li v-for="tag in marker.tags">
            {{tag}}   
          </li>

        </div>
      </li>
    </section>
  </div>
</template>

<script>

export default {
  name: 'place-list',
  props: ['markers'],
  data() {
    return {
      isActive: false,
      newTag: null
    }
  },
  methods: {
    removeMarker(marker) {
      this.$emit('removeMarker', marker);
    },
    addNewTag(marker) {
      this.$emit('addNewTag', this.tag);
    },
    toggleUpdateName() {
      this.isActive = !this.isActive
    }
  }
}

</script>

<style lang="scss" scoped>
li {
  list-style: none;
  border: 1px solid black;
  margin: 10px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  button {
    background: transparent;
    border: none;

    img {
      width: 30px;
    }
  }
}
</style>