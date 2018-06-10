<template>
  <div id="appraisalsetmain">
    <div class="stepStyle">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
      <el-button style="margin-left: 10px;" @click="next" v-if="active!=3">下一步</el-button>
      <el-button style="margin-left: 10px;" v-if="active!=0" @click="last">上一步</el-button>
    </div>

    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <!-- 1.选择测评项目 -->
      <el-form-item label="测评项目" v-if="active==0">
        <el-select v-model="ruleForm.selectValue" placeholder="请选择测评项目" @change="getSelectText">
          <el-option v-for="item in options" :key="item.F_PROJECT_ID" :label="item.F_PROJECT_NAME" :value="item.F_PROJECT_ID">
          </el-option>
        </el-select>

        <el-select v-model="personOrOrg" placeholder="请选择测评类型">
    <el-option
      v-for="item in valueList"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

      </el-form-item>
      <!-- 2.选择人员信息 -->
      <el-form-item label="人员信息" v-if="active==1">
        <userTable v-on:listenToUserChildEvent="getTableInfo" v-if="personOrOrg==1"></userTable>
        <orgTable v-on:listenToOrgChildEvent="getTableInfo" v-if="personOrOrg==0"></orgTable>
      </el-form-item>
      <!-- 3.选择测评时间 -->
      <el-form-item label="测评时间" v-if="active==2">
        <el-col :span="11">
          <el-form-item>
            <!-- <el-date-picker v-model="ruleForm.pickDate" type="datetimerange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期" :picker-options="pickerOptions2" value-format="yyyy-MM-dd">
            </el-date-picker> -->
            <el-date-picker v-model="ruleForm.pickDate" type="datetimerange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期" align="right" value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="数据校验" required v-if="active==3">
        <el-col :span="11">
          <el-card class="box-card" shadow="hover">
            <div>
              <h4>测评项目：</h4>
              <span>{{selectText}}</span>
            </div>
            <div v-if="personOrOrg==1">
              <h4>测评人员：</h4>
              <el-table :data="ruleForm.multipleSelection" style="width: 100%" height="400">
                <el-table-column type="index" width="55">
                </el-table-column>
                <el-table-column prop="USR_ID" label="员工编号">
                </el-table-column>
                <el-table-column prop="USR_NAME" label="姓名">
                </el-table-column>
                <el-table-column prop="ORG_NAME" label="单位">
                </el-table-column>
                <el-table-column prop="USR_ZZMM" label="政治面貌">
                </el-table-column>
                <el-table-column prop="USR_XZJB" label="行政级别">
                </el-table-column>
                <el-table-column prop="USR_ZGMC" label="资格名称">
                </el-table-column>
              </el-table>
            </div>
            <div v-if="personOrOrg==0">
              <h4>测评单位：</h4>
              <el-table :data="ruleForm.multipleSelection" style="width: 100%" height="400">
                <el-table-column type="index" width="55">
                </el-table-column>
                <el-table-column prop="ORG_NAME" label="单位名称">
                </el-table-column>
              </el-table>
            </div>
            <div>
              <h4>测评时间：</h4>
              <span>{{ruleForm.pickDate[0]}}/{{ruleForm.pickDate[1]}}</span>
            </div>
          </el-card>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
  import qs from "qs" //引入post 数据转换库
  import userTable from '@/components/PC/Pages/AppraisalPages/userTable'
  import orgTable from '@/components/PC/Pages/AppraisalPages/orgTable'
  export default {
    name: 'AppraisalSetMain',
    components: {
      userTable,
      orgTable
    },
    data() {
      return {
        active: 0,
        selectText: '',
        options: [], //测评项目数据项       
        pickerOptions2: {
          shortcuts: [{
              text: '往后一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '往后15天',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                end.setTime(start.getTime() + 3600 * 1000 * 24 * 15);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '往后一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '往后三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }
          ]
        },
        ruleForm: {
          selectValue: '',
          multipleSelection: [],
          pickDate: []
        },
        loading: true,
        personOrOrg:'',
        valueList: [{
          value: '1',
          label: '个人'
        }, {
          value: '0',
          label: '班子'
        }]
      }
    },

    //与后台交互
    mounted() {

      //获取考评项目信息
      let url = process.env.API_HOST + "/odata/F_PROJECT_INFO";

      this.$axios(url).then(res => {
        this.options = res.data.value;
      }).catch(error => {
        console.log(error);
      });

    },
    methods: {
      getTableInfo(data) {
        this.ruleForm.multipleSelection = data;
      },

      //“下一步”点击事件调用方法
      next() {
        if (this.active++ > 2) {
          this.active = 0;
        }
      },
      //“上一步”点击事件调用方法
      last() {
        if (this.active-- < 0) {
          this.active = 0;
        }
      },

      // },
      //翻页方法1
      handleSizeChange: function (size) {
        this.pagesize = size;
      },
      //翻页方法2
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
      },
      //表单提交方法
      submitForm(formName) {

        if (this.ruleForm.selectValue == '') {
          this.$message.error('测评项目未选择');
          this.active = 0;
        } else if(this.personOrOrg==''){
           this.$message.error('测评类型未选择');
          this.active = 0;
        }
        else if (this.ruleForm.multipleSelection.length === 0) {
          this.$message.error('测评人员未选择');
          this.active = 1;
        } else if (this.ruleForm.pickDate.length === 0) {
          this.$message.error('测评时间未选择');
          this.active = 2;
        } else {
          this.$prompt('请输入这次测评的名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({
            value
          }) => {
            let url = process.env.API_HOST + "/odata/CONF_INFO";
            let CONF_INFO = new Object();
            let userid = '';
            // CONF_INFO["CONF_ID"]=2;
            CONF_INFO.F_PROJECT_ID = this.ruleForm.selectValue;
            for (var i = 0; i < this.ruleForm.multipleSelection.length; i++) {
              if (this.personOrOrg==1) {//1是个人  0是班子
                userid += this.ruleForm.multipleSelection[i].USR_ID + ",";
              } else {
                userid += this.ruleForm.multipleSelection[i].ORG_ID + ",";
              }
            }
             if (this.personOrOrg==1) {//true是个人  false是班子
                CONF_INFO.CONF_ORG=true;
              } else {
                CONF_INFO.CONF_ORG=false;
              }
            CONF_INFO.CONF_VALUE_ID = userid.slice(0, userid.length - 1);
            CONF_INFO.CONF_STARTTIME = this.ruleForm.pickDate[0];
            CONF_INFO.CONF_ENDTIME = this.ruleForm.pickDate[1];
            CONF_INFO.CONF_BEIZHU = value;
            console.log(CONF_INFO);

            this.$axios.post(url, qs.stringify(CONF_INFO)).then(res => {
              this.$message({
                type: 'success',
                message: '配置成功!'
              });
              this.active = 0;
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '配置未成功！'
              });
              this.active = 3;
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消创建'
            });
          });



          // this.$confirm('提交后配置将生效，是否继续?', '提示', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   type: 'warning'
          // }).then(() => {
          //   let url = process.env.API_HOST + "/odata/CONF_INFO";
          //   let CONF_INFO = new Object();
          //   let userid = '';
          //   // CONF_INFO["CONF_ID"]=2;
          //   CONF_INFO.F_PROJECT_ID = this.ruleForm.selectValue;
          //   for (var i = 0; i < this.ruleForm.multipleSelection.length; i++) {
          //     if (this.ruleForm.selectValue == 20001) {
          //       userid += this.ruleForm.multipleSelection[i].USR_ID + ",";
          //     } else {
          //       userid += this.ruleForm.multipleSelection[i].ORG_ID + ",";
          //     }
          //   }
          //   CONF_INFO.CONF_VALUE_ID = userid.slice(0, userid.length - 1);
          //   CONF_INFO.CONF_STARTTIME = this.ruleForm.pickDate[0];
          //   CONF_INFO.CONF_ENDTIME = this.ruleForm.pickDate[1];
          //   console.log(CONF_INFO);

          //   this.$axios.post(url, qs.stringify(CONF_INFO)).then(res => {
          //     this.$message({
          //       type: 'success',
          //       message: '配置成功!'
          //     });
          //     this.active = 0;
          //   }).catch(() => {
          //     this.$message({
          //       type: 'info',
          //       message: '配置未成功！'
          //     });
          //     this.active = 3;
          //   });
          // }).catch(error => {
          //   console.log(error);
          // });

        }
      },
      //表单重置方法
      resetForm(formName) {
        // this.$refs[formName].resetFields();
        this.active = 0;
        this.ruleForm.selectValue = '';
        this.ruleForm.multipleSelection = [];
        this.ruleForm.pickDate = [];
      },

      getSelectText() {
        let url = process.env.API_HOST + "/odata/F_PROJECT_INFO(" + this.ruleForm.selectValue + ")";
        this.$axios(url).then(res => {
          this.selectText = res.data.F_PROJECT_NAME;
        }).catch(error => {
          console.log(error);
        });
      }


    }
  }
</script>
<style scoped>
  .stepStyle {

    height: 100px;
    border-bottom: 1px #bfbfbf solid;
    margin: auto;
  }

  .el-steps {
    margin-top: 20px;

  }

  .selectStyle {
    margin: 20px 20px;
  }

  .box-card {
    width: 100%;
  }

  .el-form-item {
    margin: 10px 10px;
  }
</style>