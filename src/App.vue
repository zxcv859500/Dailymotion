<template>
  <el-container class="app">
    <el-aside width="150px">
      <Nav></Nav>
    </el-aside>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Nav from './components/Nav.vue'
export default {
  name: 'App',
  components: {
    Nav
  },
  data () {
    return {
      //
    }
  }
}
</script>
