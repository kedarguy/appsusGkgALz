<template>
  <div class="email-Nav">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">Inbox</template>
        <el-menu-item index="1-1">unread</el-menu-item>
        <el-menu-item index="1-2">Important</el-menu-item>
      </el-submenu>
      <el-menu-item index="2">Sent</el-menu-item>
      <el-menu-item index="3">Trash</el-menu-item>
    </el-menu>

  </div>
</template>

<script>

export default {
  name: 'email-nav',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
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
.email {
  background-color: lightblue;
  border: 2px solid black;
}
</style>
