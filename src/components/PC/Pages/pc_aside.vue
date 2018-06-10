<template>
<el-row class="tac">
  <el-col :span="24">  
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router>      
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>考核管理</span>
        </template>
        <el-menu-item-group>          
          <el-menu-item index="AppraisalSetMain">考核配置</el-menu-item>        
        </el-menu-item-group>   
        <el-menu-item-group>          
          <el-menu-item index="SetProjectInfo">考评参数配置</el-menu-item>        
        </el-menu-item-group>     
      </el-submenu>
      <!-- <el-menu-item index="AppraisalSetMain">
        <i class="el-icon-menu"></i>
        <span slot="title">考核管理</span>
      </el-menu-item> -->
      <el-menu-item index="UserSetMain" >
        <i class="el-icon-document"></i>
        <span slot="title">人员管理</span>
      </el-menu-item> 
      <el-menu-item index="Query" >
        <i class="el-icon-document"></i>
        <span slot="title">统计查询</span>
      </el-menu-item>      
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>其他功能</span>
        </template>
        <el-menu-item-group>          
          <el-menu-item index="3-1">修改密码</el-menu-item>        
        </el-menu-item-group>       
      </el-submenu>
    </el-menu>
  </el-col>
  
</el-row>

</template>
<script>
export default {
  name:'pcAside',
  data(){
      return{

      }
  },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style scoped>
.el-col{
  
  /* border-right: 1px black solid; */
  line-height: 100%;
  text-align: center;
}
span{
  font-size: 18px;
}

</style>



