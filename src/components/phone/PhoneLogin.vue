<template>
  <el-container>
    <el-header>
      <PhoneHeader></PhoneHeader>
    </el-header>
    <el-main>
      <PhoneMain></PhoneMain>
    </el-main>
    <el-footer>
        <PhoneFooter></PhoneFooter>
    </el-footer>
  </el-container>
</template>
<script>
  import PhoneHeader from '@/components/phone/Pages/PhoneHeader'
   import PhoneMain from '@/components/phone/Pages/PhoneMain'
   import PhoneFooter from '@/components/phone/Pages/PhoneFooter'
  
  export default {
    name: 'PhoneLogin',
    components: {
      PhoneHeader,
      PhoneMain,
      PhoneFooter
    },
    data() {
      return {
    
      }
    },
    created(){
      
    }
  }

</script>
<style scoped>


</style>
