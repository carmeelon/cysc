<template>
    <div>
        <div class="selectProject">
            <el-row>
                <el-col :span="12">
                    <el-select v-model="selectedF_PROJECT" placeholder="请选择要修改的测评项目名称" >
                        <el-option v-for="item in F_PROJECT_INFO" :key="item.F_PROJECT_ID" :label="item.F_PROJECT_NAME" :value="item.F_PROJECT_ID"></el-option>
                    </el-select>
                </el-col>
            </el-row>
        </div>
        <div v-if="actice">
           
        </div>
    </div>


</template>
<script>
    export default {
        name: 'SetProjectInfo',
        data() {
            return {
                F_PROJECT_INFO: [],
                selectedF_PROJECT: '',
                actice: false,

            }
        },
        mounted() {
            this.getF_ProjectData();
        },
        methods: {
            getF_ProjectData() {
                //获取考评项目信息
                let url = process.env.API_HOST + "/odata/F_PROJECT_INFO";

                this.$axios(url).then(res => {
                    this.F_PROJECT_INFO = res.data.value;
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    }
</script>
<style scoped>
    .selectProject {
        margin: 20px 20px;
    }
</style>