<template>
  <div>
    <div>
      <el-card class="PhoneMain-box-card">
        <div>
          <el-row>
            <el-col :xs="24">
              <el-steps :active="active" finish-status="success" align-center>
                <el-step title="选择测评项目"></el-step>
                <el-step title="选择测评人员"></el-step>
                <el-step title="打分"></el-step>
              </el-steps>
            </el-col>
          </el-row>

        </div>
        <div>
          <el-form :model="phoneForm" class="phoneForm-stytle">
            <el-form-item label="" v-if="active==0">
              <el-row type="flex" justify="center">
                <el-col :xs="18" :offset="3">
                  <el-select v-model="phoneForm.systemSelectValue" placeholder="请选择测评项目" @change="SystemSelectChanged">
                    <el-option v-for="item in systemOptions" :key="item.CONF_ID" :label="item.PROJECT_NAME" :value="item.CONF_ID">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="" v-if="active==1">
              <el-row type="flex" justify="center">
                <el-col :xs="18" :offset="3">
                  <el-select v-model="phoneForm.userSelectValue" placeholder="请选择测评人员" @change="UserSelectChanged" v-loading="loading">
                    <el-option v-for="item in userOptions" :key="item.USER_ID" :label="item.USR_NAME" :value="item.USER_ID">
                      <span style="float: left">{{ item.USR_NAME }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.USER_ID }}</span>
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>

            </el-form-item>
            <el-form-item label="" v-if="active===2">
              <el-card>
                <div slot="header" class="clearfix">
                  <h3>{{systemName}} 测评</h3>
                </div>
                <el-row>
                  <el-col :xs="6">
                    <h6>姓名：</h6>
                  </el-col>
                  <el-col :xs="6">
                    <span>{{userInfo.USR_NAME}}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="6">
                    <h6>单位：</h6>
                  </el-col>
                  <el-col :xs="6">
                    <span>{{userInfo.ORG_NAME==''?'无':userInfo.ORG_NAME}}</span>
                  </el-col>
                  <el-col :xs="6">
                    <h6>职位：</h6>
                  </el-col>
                  <el-col :xs="6">
                    <span>{{userInfo.USR_ZW==''?'无':userInfo.USR_ZW}}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="6">
                    <h6>政治面貌：</h6>
                  </el-col>
                  <el-col :xs="6">
                    <span>{{userInfo.USR_ZZMM==''?'无':userInfo.USR_ZZMM}}</span>
                  </el-col>
                  <el-col :xs="6">
                    <h6>行政级别：</h6>
                  </el-col>
                  <el-col :xs="6">
                    <span>{{userInfo.USR_XZJB==''?'无':userInfo.USR_XZJB}}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="6">
                    <h4>得分：</h4>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24">
                    <el-radio-group v-model="phoneForm.score" @change="selectChanged">
                      <el-radio :label="1">优秀</el-radio>
                      <el-radio :label="2">良好</el-radio>
                      <el-radio :label="3">一般</el-radio>
                      <el-radio :label="4">较差</el-radio>
                    </el-radio-group>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24">

                    <el-button type="primary" size="mini" @click="submitForm">确认</el-button>
                    <el-button type="info" size="mini" @click="resetActive">重置</el-button>

                  </el-col>
                </el-row>
              </el-card>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>

  </div>






</template>
<script>
  import format from '@/assets/JS/FormatDate'
  export default {
    name: 'PhoneMain',
    data() {
      return {
        phoneForm: {//表单待提交数据
          systemSelectValue: '',
          userSelectValue: '',
          score: ''
        },
        systemOptions: [],  //系统选择菜单
        userOptions: [],    //用户选择菜单
        active: 0,        
        userInfo: {          //数据校验用户信息
          USR_NAME:'',
          ORG_NAME:'',
          USR_ZW:'',
          USR_ZZMM:'',
          USR_XZJB:''
        },
        systemName:'',           //待显示的系统名称
        loading:false
      }
    },
    created() {
      let urlValue=window.location.href;    
       
      var day2 = new Date();
      day2.setDate(day2.getDate());
      var todayDate = day2.format("yyyy-MM-dd");
      //获取测评项目信息
      let url = process.env.API_HOST + "/odata/v_config_project?$filter=(STARTTIME le DateTime'" + todayDate +
        "')and(ENDTIME ge DateTime'" + todayDate + "')";
      this.$axios(url).then(res => {
        this.systemOptions = res.data.value;
      }).catch(error => {
        console.log(error);
      });
       
    },
    methods: {
      //获取网址querystring值
      GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
},
      SystemSelectChanged() {
        this.loading=true;
        //获取测评人员信息（未完成,要排除已经投过票的人员）
        let url = process.env.API_HOST + "/odata/v_config_info?$filter=(CONF_ID eq "+this.phoneForm.systemSelectValue+")";
        this.$axios(url).then(res => {
          this.userOptions = res.data.value;
        }).catch(error => {
          console.log(error);
        });
        //获取测评项目名称
        this.active = 1;
        url = process.env.API_HOST + "/odata/v_config_project?$filter=(CONF_ID eq "+this.phoneForm.systemSelectValue+")";
        this.$axios(url).then(res => {    
          this.systemName = res.data.value[0].PROJECT_NAME;          
        }).catch(error => {
          console.log(error);
        });
        this.loading=false;
       
        
      },
      //重置按钮
      resetActive() {
        this.active = 0;
        this.phoneForm.systemSelectValue = '';
        this.phoneForm.userSelectValue = '';
        this.phoneForm.score = '';        
        //this.systemOptions=[];
        this.userOptions=[];
       this.userInfo.USR_NAME='';
       this.userInfo.ORG_NAME='';
       this.userInfo.USR_ZW='';
       this.userInfo.USR_ZZMM='';
       this.userInfo.USR_XZJB='';        
        this.systemName='';
      },
      //用户选择事件
      UserSelectChanged() {
        //获取用户信息
        let url = process.env.API_HOST + "/odata/v_user_info?$filter=USR_ID eq "+this.phoneForm.userSelectValue+"";
        let item_temp = new Object();
        this.$axios(url).then(res => {  
            this.userInfo.USR_NAME=res.data.value[0].USR_NAME;
            this.userInfo.ORG_NAME=res.data.value[0].ORG_NAME;
            this.userInfo.USR_ZW=res.data.value[0].USR_ZW;
            this.userInfo.USR_ZZMM=res.data.value[0].USR_ZZMM;
            this.userInfo.USR_XZJB=res.data.value[0].USR_XZJB; 
                                          
        }).catch(error => {
          console.log(error);
        });   
        
        if (this.userInfo.length > 0) {
          this.isShowUserInfoCard = true;
        }
        this.active = 2;
      },
      selectChanged(value) {
        
        

      },
      submitForm() {
        if (this.phoneForm.systemSelectValue == '') {
          this.$message.error('未选择测评项目!');
          this.active = 0
        } else if (this.phoneForm.userSelectValue == '') {
          this.$message.error('未选择测评人员!');
          this.active = 1;
        } else if (this.phoneForm.score == '') {
          this.$message.error('未选择分数!');
        } else {
          this.$confirm('是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            switch(this.phoneForm.score){
           case 1:
           this.phoneForm.score='优秀';
           break;
           case 2:
           this.phoneForm.score='良好';
           break;
           case 3:
           this.phoneForm.score='一般';
           break;
           case 4:
           this.phoneForm.score='较差';
           break;
        }
        console.log(this.phoneForm.score);
        
            this.$message({
              type: 'success',
              message: '投票成功!'
            });
            this.active = 1;
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        }
      }
    }
  }

</script>
<style scoped>
  .phoneForm-stytle {
    margin-top: 2em;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  h3 {
    font-weight: bold;
    font-size: 1.5em;
  }

  h4 {
    font-weight: bold;
    font-size: 1.2em;
  }
  h6{
    font-weight: bold;
    font-size: 1em;
  }

</style>
