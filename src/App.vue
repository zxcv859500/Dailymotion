<template>
  <div class="app">
    <el-header style="height: 35px" class="app-header">
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="150px" class="app-nav">
        <Nav></Nav>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'
import Header from './components/Header.vue'
export default {
  name: 'App',
  components: {
    Nav,
    Header
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style>
  .app-header {
    -webkit-app-region: drag;

    position:fixed;

    left:0;
    top:0;
    width:100vw;
    z-index:200;
    height:100px;
  }
  .app-nav{
    margin-top: 30px;
  }
</style>
