<template>
    <el-table ref="multipleTable" :data="userInfoData" tooltip-effect="dark" height="600" style="width: 100%" stripe @selection-change="handleSelectionChange"
        >
        <el-table-column type="index" width="55">
                </el-table-column>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="USR_ID" label="员工编号"></el-table-column>
        <el-table-column prop="USR_NAME" label="姓名"></el-table-column>
        <el-table-column prop="ORG_NAME" label="单位" :filters="filterData.dw" :filter-method="filterDW"
            filter-placement="bottom-end"></el-table-column>
        <el-table-column prop="USR_ZZMM" label="政治面貌" :filters="filterData.zzmm" :filter-method="filterZZMM"
            filter-placement="bottom-end"></el-table-column>
        <el-table-column prop="USR_XZJB" label="行政级别" :filters="filterData.xzjb" :filter-method="filterXZJB"
            filter-placement="bottom-end"></el-table-column>
        <el-table-column prop="USR_ZGMC" label="资格名称" :filters="filterData.zgmc" :filter-method="filterZGMC"
            filter-placement="bottom-end"></el-table-column>
    </el-table>
</template>
<script>
    export default {
        name: 'userTable',
        data() {
            return {
                filterData: {
                    //过滤标签数据源
                    xzjb: [],
                    zzmm: [],
                    zgmc: [],
                    dw:[]
                },
                userInfoData: [], //人员信息数据 
                multipleSelection: [],              
            }
        },
        created() {            
            this.getUserInfo();
            this.getFilterInfo();
        },
        mounted() {
          
        },
        methods: {
            //向父组件传值
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.$emit("listenToUserChildEvent", this.multipleSelection);
            }, //过滤标签显示方法1
            filterZZMM(value, row) {
                return row.USR_ZZMM === value;
            }, //过滤标签显示方法2
            filterXZJB(value, row) {
                return row.USR_XZJB === value;
            }, //过滤标签显示方法3
            filterZGMC(value, row) {
                return row.USR_ZGMC === value;
            },
             filterDW(value, row) {
                return row.ORG_NAME === value;
            },
            getUserInfo() {
                //获取用户信息      
                let url = process.env.API_HOST + "/odata/V_USER_INFO?$orderby=USR_NO";
                this.$axios(url).then(res => {
                    this.userInfoData = res.data.value;
                }).catch(error => {
                    console.log(error);
                });
            },
            getFilterInfo() {
                //获取“政治面貌”信息
                let url = '';
                url = process.env.API_HOST + "/odata/V_USER_INFO?$select=USR_ZZMM";
                this.$axios(url).then(res => {
                    this.filterData.zzmm = this.groupBy(res.data.value, 'USR_ZZMM');
                }).catch(error => {
                    console.log(error);
                }); //获取“行政级别”信息
                url = process.env.API_HOST + "/odata/V_USER_INFO?$select=USR_XZJB";
                this.$axios(url).then(res => {
                    this.filterData.xzjb = this.groupBy(res.data.value, 'USR_XZJB');
                }).catch(error => {
                    console.log(error);
                }); //获取“资格名称”信息
                url = process.env.API_HOST + "/odata/V_USER_INFO?$select=USR_ZGMC";
                this.$axios(url).then(res => {
                    this.filterData.zgmc = this.groupBy(res.data.value, 'USR_ZGMC');
                }).catch(error => {
                    console.log(error);
                });//获取“单位”信息
                url = process.env.API_HOST + "/odata/V_USER_INFO?$select=ORG_NAME";
                this.$axios(url).then(res => {
                    this.filterData.dw = this.groupBy(res.data.value, 'ORG_NAME');
                }).catch(error => {
                    console.log(error);
                });
            }, //对接口数据进行GroupBy,提取所有不同项
            groupBy(items, propertyName) {
                var result = [];
                var arrayTemp = []; //对items进行遍历
                $.each(items, function (index, item) {
                    //调用jqery inArray方法进行判断
                    if ($.inArray(item[propertyName], result) == -1) {
                        result.push(item[propertyName]);
                    }
                }); //创建新的对象数组
                for (var i = 0; i < result.length; i++) {
                    var itemTemp = new Object();
                    itemTemp.text = result[i];
                    itemTemp.value = result[i];
                    arrayTemp.push(itemTemp);
                }
                return arrayTemp;
            }
        }
    }
</script>
<style scoped>
  .el-table td,
  .el-table th {
    min-width: 0;
    text-overflow: ellipsis;
    vertical-align: middle;
    padding: 0px;
  }

  .el-table .cell {
    line-height: 1em;
  }
</style>