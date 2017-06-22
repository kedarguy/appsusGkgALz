<template>
  <div class="top-nav">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect">
      <el-submenu index="1" v-if="currRoute === 'EMail'">
        <template slot="title" >Email menu</template>
        <el-menu-item index="1-1">email Menu item 1</el-menu-item>
        <el-menu-item index="1-2">email Menu item 2</el-menu-item>
      </el-submenu>
      <el-submenu index="1" v-if="currRoute === 'Places'">
        <template slot="title" >Places menu</template>
        <el-menu-item index="1-1">places Menu item 1</el-menu-item>
        <el-menu-item index="1-2">places Menu item 2</el-menu-item>
      </el-submenu>
      <el-submenu index="1" v-if="currRoute === 'BookStore'">
        <template slot="title" >BookStore menu</template>
        <el-menu-item index="1-1">BookStore Menu item 1</el-menu-item>
        <el-menu-item index="1-2">Bookstore Menu item 2</el-menu-item>
      </el-submenu>
  
      <el-submenu index="2" class="route-nav">
        <template slot="title">route nav</template>
        <router-link to="email">
          <el-menu-item index="2-1">E-Mail</el-menu-item>
        </router-link>
        <router-link to="places">
          <el-menu-item index="2-2">Places</el-menu-item>
        </router-link>
        <router-link to="book-store">
          <el-menu-item index="2-3">Book Store</el-menu-item>
        </router-link>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: 'top-nav',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  computed: {
    currRoute() {
      return this.$route.name
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.route-nav {
  float:right;
}

</style>
