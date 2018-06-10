<template>
  <el-row>
    <el-col :xs="24">
      <div class="phone-header">
        <h1>采油三厂干部履职考核及作风评价系统</h1>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    name: 'PhoneHeader',
    data() {
      return {

      }
    }
  }

</script>
<style scoped>
  .phone-header {
    background-color:crimson;
    width: 100%;
    line-height:400%;
    text-align: center;    
  }
  h1{
      color: aliceblue;
      font-size: 20px;
      
  }

</style>
