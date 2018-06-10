<template>
  <el-container>
    <!-- 头部 -->
    <el-header height="80px">
      <pcHeader></pcHeader>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <pcAside></pcAside>
      </el-aside>
      <el-container>
        <!-- 中间内容 -->
        <el-main><pcMain></pcMain></el-main>
        
      </el-container>
    </el-container>
    <!-- 尾部 -->
        <el-footer height="40px">
          <pcFooter></pcFooter>
        </el-footer>
  </el-container>
</template>
<script>
  import pcHeader from '@/components/PC/Pages/pc_header'
  import pcAside from '@/components/PC/Pages/pc_aside'
  import pcMain from '@/components/PC/Pages/pc_main'
  import pcFooter from '@/components/PC/Pages/pc_footer'
  export default {
    name: 'PCIndex',
    data() {
      return {

      }
    },
    components: {
      pcHeader,
      pcAside,
      pcMain,
      pcFooter
    }
  }

</script>
<style>


</style>
