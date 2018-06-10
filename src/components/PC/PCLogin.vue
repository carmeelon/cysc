<template>

  <div v-if="isLogin">
    
      <PCIndex></PCIndex>
    </div>

    <div v-else>
      <el-card class="box-card">
        <el-input v-model="input" placeholder="请输入密码" type="password"></el-input>

        <el-button type="primary" @click="loginSystem">登陆</el-button>
        </el-card>
    </div>

    

</template>
<script>
  import PCIndex from '@/components/PC/PCIndex'
  export default {
    name: 'pclogin',
    components: {
      PCIndex
    },
    data() {
      return {
        input: '',
        isLogin: false
      }
    },
    methods: {
   loginSystem(){
       if(this.input==="123456"){
           this.isLogin=true;
           this.$router.push({ name: 'pcHello'})

       }else
       {
           this.isLogin=false;
           this.$message.error("密码错误")
       }
   }
    }
  }

</script>
<style scoped>
  .box-card {

    background-color: #fff;
    border-radius: 20px;
    width: 300px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .el-button {
    margin-top: 20px;
    margin-left: 10px;
  }

</style>
