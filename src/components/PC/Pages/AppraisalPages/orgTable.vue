<template>
        <el-table ref="multipleTable" :data="orgInfoData" tooltip-effect="dark" height="600" style="width: 100%" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="ORG_NAME" label="单位名称"></el-table-column>       
    </el-table>
</template>
<script>
export default {
    name:'orgTable',
    data(){
        return{
orgInfoData:[],
multipleSelection: [],   

        }
    },
    mounted(){
        this.getOrgInfo();
    },
    methods:{
        //向父组件传值
        handleSelectionChange(val) {
                this.multipleSelection = val;
                this.$emit("listenToOrgChildEvent", this.multipleSelection);
            },
            //获取用户信息
        getOrgInfo(){
            let url = process.env.API_HOST + "/odata/ORG_INFO?$orderby=ORG_ID";
                this.$axios(url).then(res => {
                    this.orgInfoData = res.data.value;
                }).catch(error => {
                    console.log(error);
                });
        }
    }
}
</script>
<style scoped>

</style>
