<template>
  <div>
    <div class="">
      <el-input placeholder="请输入内容" v-model="searchValue" class="input-with-select">
        <el-select v-model="searchType" slot="prepend" placeholder="请选择" class="selectType">
          <el-option label="人名" value="1"></el-option>
          <!-- <el-option label="单位" value="2"></el-option> -->
          <el-option label="员工编号" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="showTable"></el-button>
      </el-input>
      
    </div>
    <div v-if="isShowTable">
      <el-table ref="singleTable" :data="userData" style="width: 100%" height="600" highlight-current-row>
        <el-table-column property="USR_ID" label="工号">
        </el-table-column>
        <el-table-column property="USR_NAME" label="姓名">
        </el-table-column>
        <el-table-column property="USR_JG" label="籍贯">
        </el-table-column>
        <el-table-column property="USR_MZ" label="名族">
        </el-table-column>
        <el-table-column property="USR_XB" label="性别">
        </el-table-column>
        <el-table-column property="ORG_NAME" label="单位">
        </el-table-column>
        <el-table-column property="USR_ZW" label="职务">
        </el-table-column>
        <el-table-column property="USR_XZJB" label="行政级别">
        </el-table-column>
        <el-table-column property="USR_ZZMM" label="政治面貌">
        </el-table-column>
        <el-table-column property="USR_ZGMC" label="资格名称">
        </el-table-column>
        <el-table-column property="USR_ZGDJ" label="资格等级">
        </el-table-column>
        <el-table-column property="USR_FZRQ" label="技能等级">
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <!-- 弹出表单 -->
          <template slot-scope="scope">
            <el-button type="text" @click="SetFormData(scope.$index, scope.row)">选择</el-button>

            <el-dialog title="人员信息修改" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :append-to-body="true">
              <el-form ref="form" :model="form" label-width="80px" size="mini">
                <el-form-item label="员工编号">
                  <el-input v-model="form.USR_ID" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                  <el-input v-model="form.USR_NAME" disabled></el-input>
                </el-form-item>
                <el-form-item label="单位">
                  <el-select v-model="form.ORG_NAME" placeholder="请选择单位">
                    <el-option v-for="item in orgData" :key="item.ORG_NAME" :label="item.ORG_NAME" :value="item.ORG_NAME">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="职务">
                  <el-input v-model="form.USR_ZW"></el-input>
                </el-form-item>
                <el-form-item label="行政级别">
                  <el-input v-model="form.USR_XZJB"></el-input>
                </el-form-item>
                <el-form-item label="政治面貌">
                  <el-input v-model="form.USR_ZZMM"></el-input>
                </el-form-item>
                <el-form-item label="资格名称">
                  <el-input v-model="form.USR_ZGMC"></el-input>
                </el-form-item>
                <el-form-item label="资格等级">
                  <el-input v-model="form.USR_ZGDJ"></el-input>
                </el-form-item>
                <el-form-item label="技能等级">
                  <el-input v-model="form.USR_FZRQ"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit()">修改</el-button>
                  <el-button @click="dialogVisible=false">取消</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>

          </template>

        </el-table-column>
      </el-table>
    </div>
    <div>
    </div>
  </div>

</template>

<script>
  import qs from "qs" //引入post 数据转换库
  export default {
    name: 'UserSetMain',
    data() {
      return {
        userData: [], //人员信息表数据
        dialogVisible: false,
        form: {
          USR_ID: '',
          USR_JG: '',
          USR_MZ: '',
          USR_XB: '',
          ORG_NAME: '',
          USR_ZW: '',
          USR_XZJB: '',
          USR_ZZMM: '',
          USR_ZGMC: '',
          USR_ZGDJ: '',
          USR_FZRQ: ''

        },
        loading: false,
        orgData: [], //弹出框的单位数据
        searchType: '', //查询的类型
        searchValue: '', //查询的值
        isShowTable: false, //是否显示表格，
        org_id: ''
      }
    },
    mounted() {
      // console.log(process.env.API_HOST);

    },
    methods: {
      //显示表格
      showTable() {
        let url = process.env.API_HOST;
        switch (this.searchType) {
          case '1': //人名
            url += "/odata/V_USER_INFO?$filter=USR_NAME eq '" + this.searchValue + "'";
            break;
          case '2': //单位
            url += "/odata/V_USER_INFO?$filter=ORG_NAME eq '" + this.searchValue + "'";
            break;
          case '3': //员工编号
            url += "/odata/V_USER_INFO?$filter=USR_ID eq '" + this.searchValue + "'";
            break;
        }
        this.$axios(url).then(res => {
          this.userData = res.data.value;
        }).catch(error => {
          console.log(error);
        });
        this.isShowTable = true;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //表格内部修改按钮弹出框
      SetFormData(index, row) {
        let url = process.env.API_HOST + "/odata/ORG_INFO";
        this.$axios(url).then(res => {
          this.orgData = res.data.value;
        }).catch(error => {
          console.log(error);
        });
        this.dialogVisible = true;
        this.form.USR_ID = row.USR_ID;
        this.form.USR_NAME = row.USR_NAME;
        this.form.ORG_NAME = row.ORG_NAME;
        this.form.USR_JG = row.USR_JG;
        this.form.USR_MZ = row.USR_MZ;
        this.form.USR_XB = row.USR_XB;
        this.form.USR_ZW = row.USR_ZW;
        this.form.USR_XZJB = row.USR_XZJB;
        this.form.USR_ZZMM = row.USR_ZZMM;
        this.form.USR_ZGMC = row.USR_ZGMC;
        this.form.USR_ZGDJ = row.USR_ZGDJ;
        this.form.USR_FZRQ = row.USR_FZRQ;
      },
      //修改人员信息按钮
      onSubmit() {

        let url = process.env.API_HOST + "/odata/ORG_INFO?$filter=ORG_NAME eq '" + this.form.ORG_NAME + "'";

        this.$axios(url).then(res => {
          this.org_id = res.data.value[0].ORG_ID;
          //创建数据库user_info对象
          var userInfoData = new Object();
          userInfoData.USR_ID = this.form.USR_ID;
          userInfoData.ORG_ID = this.org_id;
          userInfoData.USR_ZW = this.form.USR_ZW;
          userInfoData.USR_XZJB = this.form.USR_XZJB;
          userInfoData.USR_ZZMM = this.form.USR_ZZMM;
          userInfoData.USR_ZGMC = this.form.USR_ZGMC;
          userInfoData.USR_ZGDJ = this.form.USR_ZGDJ;
          userInfoData.USR_FZRQ = this.form.USR_FZRQ;

          console.log(userInfoData);
          //利用patch进行更新
          url = process.env.API_HOST + "/odata/USER_INFO(" + this.form.USR_ID + ")";
          this.$axios.patch(url, userInfoData)
            .then(res => {
              this.$message("修改成功！");
              //刷新数据
              this.showTable();
              this.dialogVisible=false;
            }).catch(error => {
              console.log(error);
            });
          console.log(this.org_id);
        }).catch(error => {
          console.log(error);
        });

      }
    }
  }
</script>
<style scoped>
  .el-input-group__prepend {
    width: 200px;
  }

  .selectType {
    width: 100px;
  }
</style>