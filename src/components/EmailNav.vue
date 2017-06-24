<template>
  <div class="email-Nav">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">Inbox</template>
        <el-menu-item index="1-1">Unread</el-menu-item>
        <el-menu-item index="1-2">Read</el-menu-item>
        <el-menu-item index="1-3">Important</el-menu-item>
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
      let tag;
      switch (key) {
        case '1-1': {
          tag = 'Unread';
          break;
        }
        case '1-2': {
          tag = 'isRead';
          break;
        }
        case '1-3': {
          tag = 'isImportant';
          break;
        }
        case '2': {
          tag = 'isSent';
          break;
        }
        case '3': {
          tag = 'isTrashed';
          break;
        }
      }
      this.$emit('filterTags', tag);
    },
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
